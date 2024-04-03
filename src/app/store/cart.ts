import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { TProduct } from './product';
import { getCookies } from '../../utils';
import cartReducers from '../../controllers/cart';

export type TCartProduct = {
	imageUrl: string;
	counter: number;
} & Partial<TProduct>;

export type TCart = {
	products: TCartProduct[] | undefined;
	userId?: string | null;
	anonymousUserId: string | null;
	contactId?: string | null;
	paymentMethod?: string | null;
	totalPrice: number;
};

const initialState: TCart = getCookies('cart') || {
	products: [],
	totalPrice: 0,
};

export const CartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: cartReducers,
});

export const {
	addToCart,
	addToCounter,
	removeFromCounter,
	removeProduct,
	addAnonymousUserToCart,
	addUserAndContactToCart,
	addPaymentMethodToCart,
	updateTotalPrice,
	emptyTheCart,
} = CartSlice.actions;

export const selectProfile = (state: RootState) => state;

export default CartSlice.reducer;
