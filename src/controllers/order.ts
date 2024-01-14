import { auth } from '../firebase/config';
import { TCart, TCartProduct } from '../app/store/cart';
import addData from '../firebase/firestore/addData';
import updateDocs from '../firebase/firestore/updateDoc';
import { User } from 'firebase/auth';
import getData from '../firebase/firestore/getData';

export type TOrder = {
	userId: string;
	contact: string | null;
	productIds: TCartProduct[];
	totalPrice: number;
};

export const createAnOrder = async (cart: TCart) => {
	try {
		const currUser: User | null = auth.currentUser;
		const order = await addData('orders', {
			userId: cart?.userId,
			contact: cart?.contactId || null,
			products: cart?.products,
			totalPrice: cart?.totalPrice,
		});
		await updateDocs('orders', order?.id, { id: order?.id });

		if (currUser) {
			const { docId } = await getData(
				'users',
				'uid',
				currUser?.uid,
			);
			await updateDocs('users', docId as string, {
				order: order?.id,
			});
		}

		await updateProductQuantity(cart?.products);
	} catch (e: any) {
		console.log(e.message);
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
