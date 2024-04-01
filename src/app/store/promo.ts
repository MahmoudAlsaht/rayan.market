import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
	fetchPromos,
	createPromo,
	updatePromo,
} from '../../controllers/promo';

export type TPromoCode = {
	_id: string;
	code: string;
	discount: number;
	expired: boolean;
	startDate: string | null;
	endDate: string | null;
};

const initialState: (TPromoCode | null)[] = [];

export const PromosSlice = createSlice({
	name: 'promos',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(
			fetchPromos.fulfilled,
			(state, action) => {
				state = action.payload;
				return state;
			},
		);
		builder.addCase(
			createPromo.fulfilled,
			(state, action) => {
				state = [...state, action.payload];
				return state;
			},
		);
		builder.addCase(
			updatePromo.fulfilled,
			(state, action) => {
				state = state?.map((promo) =>
					promo?._id === action.payload?._id
						? action.payload
						: promo,
				);
				return state;
			},
		);
	},
});

export const selectPromo = (state: RootState) => state;

export default PromosSlice.reducer;
