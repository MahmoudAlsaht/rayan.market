import { auth } from '../firebase/config';
import { TCart, TCartProduct } from '../app/store/cart';
import addData from '../firebase/firestore/addData';
import updateDocs from '../firebase/firestore/updateDoc';
import { User } from 'firebase/auth';
import getData from '../firebase/firestore/getData';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllData } from '../firebase/firestore/getAllData';
import { arrayUnion } from 'firebase/firestore';
import { TUser } from '../app/auth/auth';

export const createAnOrder = createAsyncThunk(
	'orders/createAnOrder',
	async (cart: TCart) => {
		try {
			const order = await addData('orders', {
				products: cart?.products,
				totalPrice: cart?.totalPrice,
				createdAt: Date.now(),
				status: 'pending',
			});
			await updateDocs('orders', order?.id, {
				id: order?.id,
				orderId: order?.id.slice(10),
			});
			await updateProductQuantity(cart?.products);

			if (!cart?.anonymousUserId) {
				const currUser: User | null = auth.currentUser;
				const user = await getData(
					'users',
					'uid',
					currUser?.uid as string,
				);
				const contact = await getData(
					'contacts',
					'id',
					cart?.contactId as string,
				);

				await updateDocs(
					'users',
					user?.docId as string,
					{
						orders: arrayUnion(order?.id),
					},
				);
				await updateDocs('orders', order?.id, {
					username: user?.data?.username,
					email: user?.data?.email,
					contact: `${contact?.data?.address?.city}, ${contact?.data?.address?.street}`,
					phoneNumber: contact?.data?.phoneNumber,
				});
				const updatedOrder = (
					await getData('orders', 'id', order?.id)
				).data;

				return updatedOrder as any;
			} else {
				const anonymousUser = (
					await getData(
						'anonymousUsers',
						'id',
						cart?.anonymousUserId as string,
					)
				).data;
				await updateDocs('orders', order?.id, {
					username: `${anonymousUser?.firstName} ${anonymousUser?.lastName}`,
					email: anonymousUser?.email,
					contact: `${anonymousUser?.city}, ${anonymousUser?.street}`,
					phoneNumber: anonymousUser?.phoneNumber,
				});
				return null;
			}
		} catch (e: any) {
			console.log(e.message);
			throw new Error('Something went wrong');
		}
	},
);

export const updateOrderStatus = createAsyncThunk(
	'orders/updateOrderStatus',
	async ({
		orderId,
		updatedStatus,
	}: {
		orderId: string;
		updatedStatus: string;
	}) => {
		try {
			await updateDocs('orders', orderId, {
				status: updatedStatus,
			});
			const { data, docId } = await getData(
				'orders',
				'id',
				orderId,
			);
			if (
				updatedStatus === 'accepted' ||
				updatedStatus === 'rejected'
			)
				await sendEmailToCustomer(
					data?.username,
					data?.email,
					data?.products,
					updatedStatus,
				);

			return { docId, updatedStatus };
		} catch (e: any) {
			console.error(e.message);
			throw new Error('Something went wrong');
		}
	},
);

export const fetchOrder = async (orderId: string) => {
	try {
		const { data } = await getData('orders', 'id', orderId);
		return data as any;
	} catch (e: any) {
		console.error(e.message);
		throw new Error('something went wrong!');
	}
};

const fetchUserOrders = async (orders: string[]) => {
	const userOrders = [];
	if (orders && orders?.length > 0) {
		for (const order of orders) {
			const { data } = await getData(
				'orders',
				'id',
				order,
			);
			userOrders.push(data);
		}
		return userOrders as any[];
	}
};

export const fetchOrders = createAsyncThunk(
	'orders/fetchOrders',
	async (userId: string) => {
		try {
			if (userId !== '') {
				const user = (
					await getData('users', 'uid', userId)
				).data as TUser;
				const orders = await fetchUserOrders(
					user?.orders as string[],
				);
				return orders;
			} else {
				const orders = await getAllData('orders');
				return orders as any[];
			}
		} catch (e: any) {
			console.error(e.message);
			return null;
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
			url: import.meta.env.VITE_API_URL,
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

const updateProductQuantity = async (
	products: TCartProduct[] | undefined,
) => {
	for (const product of products!) {
		if (product)
			await updateDocs('products', product?.id as string, {
				quantity:
					parseInt(product?.quantity as string) -
					product?.counter,
			});
	}
};

export const checkIfProductIsAvailable = (
	products: TCartProduct[] | undefined,
) => {
	const notAvailable = [];
	for (const product of products!) {
		if (
			product?.counter >
			parseInt(product?.quantity as string)
		)
			notAvailable.push(product);
	}

	return notAvailable.length === 0;
};
