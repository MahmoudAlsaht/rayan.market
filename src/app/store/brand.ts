import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
	fetchBrands,
	createBrand,
	updateBrand,
	destroyBrand,
} from '../../controllers/brand';
import { TImage, TProduct } from './product';
import { TBanner } from './banner';

export type TBrand = {
	_id: string;
	name: string;
	products: (TProduct | null)[];
	createdAt: Date;
	image: TImage;
	banner?: TBanner | null;
};

const initialState: (TBrand | null)[] = [];

export const BrandsSlice = createSlice({
	name: 'brands',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(
			fetchBrands.fulfilled,
			(state, action) => {
				state = action.payload;
				return state;
			},
		);
		builder.addCase(
			createBrand.fulfilled,
			(state, action) => {
				state = [...state, action.payload];
				return state;
			},
		);
		builder.addCase(
			updateBrand.fulfilled,
			(state, action) => {
				state = state.map((brand: TBrand | null) => {
					return brand?._id === action.payload?._id
						? action.payload
						: brand;
				});
				return state;
			},
		);
		builder.addCase(
			destroyBrand.fulfilled,
			(state, action) => {
				state = state.filter((brand: TBrand | null) => {
					return (
						brand?._id !== action.payload && brand
					);
				});
				return state;
			},
		);
	},
});

export const selectBrand = (state: RootState) => state;

export default BrandsSlice.reducer;
