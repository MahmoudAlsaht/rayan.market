import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
	fetchProducts,
	createProduct,
	updateProduct,
	destroyProduct,
} from '../../controllers/product';
import { TCategory } from './category';
import { TBrand } from './brand';

export type TImage = {
	_id: string;
	filename: string;
	path: string;
	imageType: string;
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
	offerExpiresDate?: string;
};

const initialState: (TProduct | null)[] = [];

export const ProductsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		sortProductsBasedOnPrice: (
			state: (TProduct | null)[],
			action: PayloadAction<string>,
		) => {
			if (action.payload === 'highest') {
				return state?.sort(
					(a, b) =>
						parseFloat(
							b?.newPrice || (b?.price as string),
						) -
						parseFloat(
							a?.newPrice || (a?.price as string),
						),
				);
			} else if (action.payload === 'lowest') {
				return state?.sort(
					(a, b) =>
						parseFloat(
							a?.newPrice || (a?.price as string),
						) -
						parseFloat(
							b?.newPrice || (b?.price as string),
						),
				);
			} else return state;
		},
	},
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
export const { sortProductsBasedOnPrice } =
	ProductsSlice.actions;

export default ProductsSlice.reducer;
