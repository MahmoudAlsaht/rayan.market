import { TCart, TCartProduct } from '../app/store/cart';
import updateDocs from '../firebase/firestore/updateDoc';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '../app/auth/auth';
import {
	getCookies,
	isAdmin,
	isAuthenticated,
	sendRequestToServer,
} from '../utils';
import { TOrder } from '../app/store/order';

export const createAnOrder = createAsyncThunk(
	'orders/createAnOrder',
	async (cart: TCart) => {
		try {
			const user: TUser | null = getCookies('user');
			const isUserRegistered = user == null ? false : true;
			const userId = cart?.anonymousUserId || user?._id;

			const order = await sendRequestToServer(
				'POST',
				'order/new',
				{
					products: cart?.products,
					totalPrice: cart?.totalPrice,
					userId,
					isUserRegistered,
					contactId: cart?.contactId,
				},
			);

			return order;
		} catch (e: any) {
			throw new Error(e.message);
		}
	},
);

export const updateOrderStatus = createAsyncThunk(
	'orders/updateOrderStatus',
	async ({
		orderId,
		updatedStatus,
		userId,
	}: {
		orderId: string;
		updatedStatus: string;
		userId: string;
	}) => {
		try {
			const order: TOrder | null =
				await sendRequestToServer(
					'PUT',
					`order/${orderId}`,
					{ updatedStatus, userId },
				);

			if (
				updatedStatus in
				['accepted', 'rejected', 'completed']
			) {
				if (!isAdmin())
					throw new Error('You Are Not Authorized');
			} else if (updatedStatus === 'canceled') {
				if (!isAuthenticated())
					throw new Error('You Are Not Authorized');
			} else {
				throw new Error(
					'Unexpected status: ' + updatedStatus,
				);
			}

			await updateDocs('orders', orderId, {
				status: updatedStatus,
			});

			if (
				updatedStatus === 'accepted' ||
				updatedStatus === 'rejected'
			)
				await sendEmailToCustomer(
					order?.user?.username as string,
					order?.user?.email as string,
					order?.products as TCartProduct[],
					updatedStatus,
				);

			return order;
		} catch (e: any) {
			console.error(e.message);
			throw new Error('Something went wrong');
		}
	},
);

export const fetchOrder = async (orderId: string) => {
	try {
		if (!isAuthenticated())
			throw new Error('You Are Not Authorized');

		const order: TOrder | null = await sendRequestToServer(
			'GET',
			`order/${orderId}`,
		);

		return order;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const fetchOrders = createAsyncThunk(
	'orders/fetchOrders',
	async (userId: string) => {
		try {
			if (!isAuthenticated())
				throw new Error('You Are Not Authorized');

			const orders: TOrder[] | null =
				await sendRequestToServer('POST', 'order', {
					userId,
				});

			return orders;
		} catch (e: any) {
			throw new Error(e.message);
		}
	},
);

const sendEmailToCustomer = async (
	username: string,
	email: string,
	products: TCartProduct[],
	orderStatus: string,
) => {
	try {
		const data = {
			username,
			email,
			products,
			orderStatus,
		};

		const res = await axios({
			url: `${import.meta.env.VITE_API_URL}/send`,
			data: data,
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		});
		console.log(res);
	} catch (e: any) {
		console.error(e.message);
	}
};

export const checkIfProductIsAvailable = (
	products: TCartProduct[] | undefined,
) => {
	try {
		const notAvailable = [];
		for (const product of products!) {
			if (
				product?.counter >
				parseInt(product?.quantity as string)
			)
				notAvailable.push(product);
		}

		return notAvailable.length === 0;
	} catch (e: any) {
		console.error(e.message);
		throw new Error(e.message);
	}
};
