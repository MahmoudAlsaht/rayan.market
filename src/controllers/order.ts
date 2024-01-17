import { auth } from '../firebase/config';
import { TCart, TCartProduct } from '../app/store/cart';
import addData from '../firebase/firestore/addData';
import updateDocs from '../firebase/firestore/updateDoc';
import { User } from 'firebase/auth';
import getData from '../firebase/firestore/getData';
import axios from 'axios';

export type TOrder = {
	userId: string;
	contact: string | null;
	productIds: TCartProduct[];
	totalPrice: number;
};

export const createAnOrder = async (cart: TCart) => {
	try {
		const order = await addData('orders', {
			userId: cart?.userId || cart?.anonymousUserId,
			contact: cart?.contactId || null,
			products: cart?.products,
			totalPrice: cart?.totalPrice,
		});
		await updateDocs('orders', order?.id, { id: order?.id });

		if (!cart?.anonymousUserId) {
			const currUser: User | null = auth.currentUser;
			const { docId } = await getData(
				'users',
				'uid',
				currUser?.uid as string,
			);
			await updateDocs('users', docId as string, {
				order: order?.id,
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
		}
	} catch (e: any) {
		console.log(e.message);
	}
};

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
