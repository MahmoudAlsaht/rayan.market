/* eslint-disable no-mixed-spaces-and-tabs */
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { TCartProduct } from './cart';
import {
	createAnOrder,
	fetchOrders,
	updateOrderStatus,
} from '../../controllers/order';
import { TContactInfo } from '../../controllers/contact';
import { TAnonymousUser, TUser } from '../auth/auth';

export type TOrder = {
	_id: string;
	contact: TContactInfo;
	user: TUser | TAnonymousUser;
	products: TCartProduct[];
	totalPrice: string;
	billTotal: string;
	createdAt: Date;
	orderId: string;
	status: string;
	promoCode?: string | null;
	paymentMethod: string;
	shippingFees: string;
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
				state = state.map((order) => {
					return order?._id === action.payload?._id
						? {
								...order,
								status: action.payload.status,
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
