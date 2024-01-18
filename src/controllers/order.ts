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
import { v4 as uuidv4 } from 'uuid';

export const createAnOrder = createAsyncThunk(
	'orders/createAnOrder',
	async (cart: TCart) => {
		try {
			const order = await addData('orders', {
				userId: cart?.userId || cart?.anonymousUserId,
				contact: cart?.contactId || null,
				products: cart?.products,
				totalPrice: cart?.totalPrice,
				createdAt: Date.now(),
			});
			await updateDocs('orders', order?.id, {
				id: order?.id,
				orderNumber: uuidv4() + order?.id.slice(15),
			});

			if (!cart?.anonymousUserId) {
				const currUser: User | null = auth.currentUser;
				const { docId } = await getData(
					'users',
					'uid',
					currUser?.uid as string,
				);
				await updateDocs('users', docId as string, {
					orders: arrayUnion(order?.id),
				});
			}

			await updateProductQuantity(cart?.products);

			if (!cart?.anonymousUserId) {
				const currUser: User | null = auth.currentUser;
				const user = (
					await getData(
						'users',
						'uid',
						currUser?.uid as string,
					)
				).data;
				await sendEmailToCustomer(
					user?.username,
					user?.email,
					cart.products!,
				);
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
				await sendEmailToCustomer(
					anonymousUser?.firstName,
					anonymousUser?.email,
					cart.products!,
				);
				return null;
			}
		} catch (e: any) {
			console.log(e.message);
		}
	},
);

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
	'orders/fetchUserOrders',
	async (userId?: string) => {
		try {
			if (userId && userId.length > 0) {
				const user = (
					await getData('users', 'uid', userId)
				).data as TUser;
				const orders = await fetchUserOrders(
					user?.orders as string[],
				);
				return orders;
			} else {
				const orders = await getAllData('orders');
				console.log(orders);
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
) => {
	try {
		const data = {
			username,
			email,
			products: products,
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
