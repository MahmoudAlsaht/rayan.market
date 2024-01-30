import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
	fetchBanners,
	createBanner,
	updateBanner,
	destroyBanner,
} from '../../controllers/banner';
import { DocumentData } from 'firebase/firestore';
import { DocType } from '../../firebase/firestore/getData';

export type TBanner = Partial<DocumentData> &
	Partial<DocType> & {
		id: string;
		name: string;
		images: string[] | null;
		active: boolean;
		createdAt: Date;
	};

const initialState: TBanner[] | any = null;

export const BannerSlice = createSlice({
	name: 'banners',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(
			fetchBanners.fulfilled,
			(state, action) => {
				state = action.payload;
				return state;
			},
		);
		builder.addCase(
			createBanner.fulfilled,
			(state, action) => {
				state = [...state, action.payload];
				return state;
			},
		);
		builder.addCase(
			updateBanner.fulfilled,
			(state, action) => {
				state = state.map((product: TBanner) => {
					return product.id === action.payload.id
						? action.payload
						: product;
				});
				return state;
			},
		);
		builder.addCase(
			destroyBanner.fulfilled,
			(state, action) => {
				state = state.filter((product: TBanner) => {
					return (
						product.id !== action.payload && product
					);
				});
				return state;
			},
		);
	},
});

export const selectProfile = (state: RootState) => state;

export default BannerSlice.reducer;
