import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
	fetchBanners,
	createBanner,
	updateBanner,
	updateBannersActivity,
	destroyBanner,
	updateImageLink,
} from '../../controllers/banner';
import { TImage } from './product';
import { TCategory } from './category';
import { TBrand } from './brand';

export type TBannerImage = TImage & {
	banner: TBanner;
	link: string;
};

export type TBanner = {
	_id: string;
	name: string;
	bannerImages: TBannerImage[] | null;
	createdAt: Date;
	bannerType: string;
	category?: TCategory | null;
	brand?: TBrand | null;
};

const initialState: (TBanner | null)[] = [];

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
				state = state.map((banner: TBanner | null) => {
					return banner?._id === action.payload?._id
						? action.payload
						: banner;
				});
				return state;
			},
		);
		builder.addCase(
			updateImageLink.fulfilled,
			(state, action) => {
				state = state.map((banner: TBanner | null) => {
					return banner?._id === action.payload?._id
						? action.payload
						: banner;
				});
				return state;
			},
		);
		builder.addCase(
			updateBannersActivity.fulfilled,
			(state, action) => {
				state = action.payload;
				return state;
			},
		);
		builder.addCase(
			destroyBanner.fulfilled,
			(state, action) => {
				state = state.filter(
					(banner: TBanner | null) => {
						return (
							banner?._id !== action.payload &&
							banner
						);
					},
				);
				return state;
			},
		);
	},
});

export const selectProfile = (state: RootState) => state;

export default BannerSlice.reducer;
