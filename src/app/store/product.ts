import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
	fetchProducts,
	createProduct,
	updateProduct,
	destroyProduct,
} from '../../controllers/product';
import { DocumentData } from 'firebase/firestore';

export type Product = Partial<DocumentData> & {
	id: string;
	name: string;
	images: string[] | null;
	createdAt: Date;
	price: string;
	quantity: string;
	categoryId: string;
};

const initialState: Product[] | any = null;

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
				state = state.map((product: Product) => {
					return product.id === action.payload.id
						? action.payload
						: product;
				});
				return state;
			},
		);
		builder.addCase(
			destroyProduct.fulfilled,
			(state, action) => {
				state = state.filter((product: Product) => {
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

export default ProductsSlice.reducer;
