/* eslint-disable no-mixed-spaces-and-tabs */
import { PayloadAction } from '@reduxjs/toolkit';
import { setCookies } from '../utils';
import { TCart, TCartProduct } from '../app/store/cart';

export const checkIfProductInCart = (
	cart: TCart,
	productId: string,
) => {
	for (const product of cart.products!) {
		if (product.id === productId) return true;
		return false;
	}
};

const cartReducers = {
	addToCart: (
		state: TCart,
		action: PayloadAction<TCartProduct>,
	) => {
		state!.products?.push(action.payload);
		setCookies('cart', state);
	},
	addToCounter: (
		state: TCart,
		action: PayloadAction<{ id: string; maxNum: number }>,
	) => {
		const products = state!.products!.map((product) => {
			if (product.id === action.payload.id) {
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
		setCookies('cart', state);
	},
	removeFromCounter: (
		state: TCart,
		action: PayloadAction<string>,
	) => {
		state.products = state!.products!.map((product) => {
			if (product.id === action.payload) {
				return product.counter > 0
					? {
							...product,
							counter: product.counter - 1,
					  }
					: product;
			}
			return product;
		});
		setCookies('cart', state);
	},

	removeProduct: (
		state: TCart,
		action: PayloadAction<string>,
	) => {
		state.products = state.products?.filter(
			(product) =>
				product.id !== action.payload && product,
		);
		setCookies('cart', state);
	},
};

export default cartReducers;