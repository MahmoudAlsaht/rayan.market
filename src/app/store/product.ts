import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
	fetchProducts,
	createProduct,
	updateProduct,
	destroyProduct,
} from '../../controllers/product';
import { TCategory } from './category';
import { TBrand } from './brand';
import { TLabel } from '../../controllers/label';
import { TProductOption } from '../../controllers/productOptions';

export type TImage = {
	_id: string;
	filename: string;
	path: string;
	imageType: string;
	showForMobile?: boolean;
};

export type TProductImage = TImage & {
	product: TProduct;
};

export type TProduct = {
	_id: string;
	name: string;
	productImage: TProductImage | null;
	createdAt: Date;
	price: string;
	newPrice?: string;
	quantity: string;
	category: TCategory;
	brand: TBrand;
	isOffer?: boolean;
	remaining?: string;
	isEndDate?: boolean;
	offerExpiresDate?: number;
	startOfferDate?: string | null;
	endOfferDate?: string | null;
	views: number;
	numberOfPurchases: number;
	labels?: TLabel[] | null;
	productType: string;
	description?: string;
	productOptions?: TProductOption[] | null;
};

const initialState: (TProduct | null)[] = [];

export const ProductsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(
			fetchProducts.fulfilled,
			(state, action) => {
				state = action.payload;
				return state;
			},
		);
		builder.addCase(
			createProduct.fulfilled,
			(state, action) => {
				state = [...state, action.payload];
				return state;
			},
		);
		builder.addCase(
			updateProduct.fulfilled,
			(state, action) => {
				state = state.map((product: TProduct | null) => {
					return product?._id === action.payload?._id
						? action.payload
						: product;
				});
				return state;
			},
		);
		builder.addCase(
			destroyProduct.fulfilled,
			(state, action) => {
				state = state.filter(
					(product: TProduct | null) => {
						return (
							product?._id !== action.payload &&
							product
						);
					},
				);
				return state;
			},
		);
	},
});

export const selectProfile = (state: RootState) => state;

export default ProductsSlice.reducer;
