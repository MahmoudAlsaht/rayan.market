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
	addToCounter: (state: TCart) => {
		state.products = state!.products!.map((product) => {
			return { ...product, counter: product.counter + 1 };
		});
		setCookies('cart', state);
	},
};

export default cartReducers;
