import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
	fetchProducts,
	createProduct,
	updateProduct,
	destroyProduct,
} from '../../controllers/product';
import { TImage } from '../auth/profile';
import { TCategory } from './category';

export type TProductImage = TImage & {
	product: TProduct;
};

export type TProduct = {
	_id: string;
	name: string;
	productImages: TProductImage[] | null;
	createdAt: Date;
	price: string;
	newPrice?: string;
	quantity: string;
	category: TCategory;
	isOffer?: boolean;
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
						parseInt(
							b?.newPrice || (b?.price as string),
						) -
						parseInt(
							a?.newPrice || (a?.price as string),
						),
				);
			} else if (action.payload === 'lowest') {
				return state?.sort(
					(a, b) =>
						parseInt(
							a?.newPrice || (a?.price as string),
						) -
						parseInt(
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
