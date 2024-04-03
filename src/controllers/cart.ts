/* eslint-disable no-mixed-spaces-and-tabs */
import { PayloadAction } from '@reduxjs/toolkit';
import { setCookies } from '../utils';
import { TCart, TCartProduct } from '../app/store/cart';
import { TAnonymousUser } from '../app/auth/auth';

export const checkIfProductInCart = (
	cart: TCart,
	productId: string,
) => {
	let isProductInCart = false;
	for (const product of cart.products!) {
		isProductInCart =
			isProductInCart || product?._id === productId;
	}
	return isProductInCart;
};

export const findCartProduct = (
	cart: TCart,
	productId: string,
) => {
	const product = cart.products?.find(
		(product) => product?._id === productId,
	);
	return product;
};

export const checkEveryProductCounter = (
	products: (TCartProduct | null)[],
) => {
	return products?.every(
		(product) => product && product?.counter > 0,
	);
};

const cartReducers = {
	addToCart: (
		state: TCart,
		action: PayloadAction<TCartProduct>,
	) => {
		if (parseInt(action?.payload.quantity as string) > 0) {
			state!.products?.push(action.payload);
			setCookies('cart', state, 30);
		}
	},
	updateTotalPrice: (
		state: TCart,
		action: PayloadAction<number | string>,
	) => {
		const price =
			typeof action.payload === 'string'
				? parseFloat(action.payload as string)
				: action.payload;
		state.totalPrice += price;
		setCookies('cart', state, 30);
	},
	addAnonymousUserToCart: (
		state: TCart,
		action: PayloadAction<TAnonymousUser>,
	) => {
		state.anonymousUserId = action.payload?._id;
		state.contactId = action.payload?.contact?._id;
		setCookies('cart', state, 30);
	},
	addUserAndContactToCart: (
		state: TCart,
		action: PayloadAction<{
			userId: string;
			contactId: string;
		}>,
	) => {
		state.anonymousUserId = null;
		state.userId = action.payload.userId;
		state.contactId = action.payload.contactId;
		setCookies('cart', state, 30);
	},
	addPaymentMethodToCart: (
		state: TCart,
		action: PayloadAction<string>,
	) => {
		state.paymentMethod = action.payload;
		setCookies('cart', state, 30);
	},
	addPromoCodeToCart: (
		state: TCart,
		action: PayloadAction<string | null>,
	) => {
		state.promoCode = action.payload;
		setCookies('cart', state, 30);
	},
	addToCounter: (
		state: TCart,
		action: PayloadAction<{ id: string; maxNum: number }>,
	) => {
		const products = state!.products!.map((product) => {
			if (product?._id === action.payload.id) {
				return product?.counter < action.payload.maxNum
					? {
							...product,
							counter: product.counter + 1,
					  }
					: product;
			}
			return product;
		});

		state.products = products;
		setCookies('cart', state, 30);
	},
	removeFromCounter: (
		state: TCart,
		action: PayloadAction<string>,
	) => {
		state.products = state!.products!.map((product) => {
			if (product?._id === action.payload) {
				return product.counter > 0
					? {
							...product,
							counter: product.counter - 1,
					  }
					: product;
			}
			return product;
		});
		setCookies('cart', state, 30);
	},

	removeProduct: (
		state: TCart,
		action: PayloadAction<string>,
	) => {
		state.products = state.products?.filter(
			(product) =>
				product?._id !== action.payload && product,
		);
		setCookies('cart', state);
	},
	emptyTheCart: (state: TCart) => {
		state.products = [];
		state.userId = null;
		state.contactId = null;
		state.totalPrice = 0;
		setCookies('cart', state);
	},
};

export default cartReducers;
