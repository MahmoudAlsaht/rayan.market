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

			const order = await sendRequestToServer(
				'POST',
				'order/new',
				{
					products: cart?.products,
					totalPrice: cart?.totalPrice,
					userId,
					isUserRegistered,
					contactId: cart?.contactId,
					paymentMethod: cart?.paymentMethod,
					promoCode: cart?.promoCode,
				},
			);

			return order;
		} catch (e: any) {
			throw new Error('something went wrong!');
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
			const order: TOrder | null =
				await sendRequestToServer(
					'PUT',
					`order/${orderId}`,
					{ updatedStatus },
				);

			return order;
		} catch (e: any) {
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
		throw new Error('something went wrong!');
	}
};

export const fetchOrders = createAsyncThunk(
	'orders/fetchOrders',
	async () => {
		try {
			const orders: TOrder[] | null =
				await sendRequestToServer('GET', 'order');

			return orders;
		} catch (e: any) {
			throw new Error('something went wrong!');
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
		throw new Error('something went wrong!');
	}
};
