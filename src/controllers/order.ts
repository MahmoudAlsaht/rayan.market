import { TCart, TCartProduct } from '../app/store/cart';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '../app/auth/auth';
import { sendRequestToServer } from '../utils';
import { TOrder } from '../app/store/order';

export const createAnOrder = createAsyncThunk(
	'orders/createAnOrder',
	async ({
		cart,
		user,
	}: {
		cart: TCart;
		user: TUser | null;
	}) => {
		try {
			const isUserRegistered =
				user?.username === 'anonymous' ? false : true;
			const userId = user?._id || cart?.anonymousUserId;

			console.log(cart.contactId);
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

			return order;
		} catch (e: any) {
			console.error(e.message);
			throw new Error('Something went wrong');
		}
	},
);

export const fetchOrder = async (orderId: string) => {
	try {
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
