import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { TProduct } from './product';
import { getCookies, setCookies } from '../../utils';

type TCartProduct = {
	imageUrl: string;
} & Partial<TProduct>;

export type TCart = {
	products: TCartProduct[] | null;
};

const initialState: TCart = getCookies('cart');

export const CartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (
			state,
			action: PayloadAction<TCartProduct>,
		) => {
			state!.products?.push(action.payload);
			setCookies('cart', state);
		},
	},
});

export const { addToCart } = CartSlice.actions;

export const selectProfile = (state: RootState) => state;

export default CartSlice.reducer;
