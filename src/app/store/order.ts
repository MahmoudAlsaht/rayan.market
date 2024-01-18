import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { TCartProduct } from './cart';
import {
	createAnOrder,
	fetchOrders,
} from '../../controllers/order';

export type TOrder = {
	id: string;
	userId: string;
	contact: string | null;
	productIds: TCartProduct[];
	totalPrice: number;
	createdAt: Date;
	orderNumber: number;
};

const initialState: TOrder[] = [];

const orderSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(
			createAnOrder.fulfilled,
			(state, action) => {
				if (!action.payload) return state;
				state = [...state, action.payload];
				return state;
			},
		);
		builder.addCase(
			fetchOrders.fulfilled,
			(state, action) => {
				if (!action.payload) return state;
				state = action.payload;
				return state;
			},
		);
	},
});

export const selectOrder = (state: RootState) => state;

export default orderSlice.reducer;
