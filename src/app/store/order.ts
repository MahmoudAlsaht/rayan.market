/* eslint-disable no-mixed-spaces-and-tabs */
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { TCartProduct } from './cart';
import {
	createAnOrder,
	fetchOrders,
	updateOrderStatus,
} from '../../controllers/order';

export type TOrder = {
	id: string;
	username: string;
	email: string;
	phoneNumber: string;
	address: string;
	contact: string | null;
	products: TCartProduct[];
	totalPrice: number;
	createdAt: Date;
	orderId: string;
	status: string;
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
		builder.addCase(
			updateOrderStatus.fulfilled,
			(state, action) => {
				if (!action.payload.docId) return state;
				state = state.map((order) => {
					return order?.id === action.payload.docId
						? {
								...order,
								status: action.payload
									.updatedStatus,
						  }
						: order;
				});
				return state;
			},
		);
	},
});

export const selectOrder = (state: RootState) => state;

export default orderSlice.reducer;
