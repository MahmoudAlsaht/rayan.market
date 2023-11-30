import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
	fetchProducts,
	createProduct,
	updateProduct,
	destroyProduct,
} from '../../controllers/product';
import { DocumentData } from 'firebase/firestore';
import { DocType } from '../../firebase/firestore/getData';

export type TProduct = Partial<DocumentData> &
	Partial<DocType> & {
		id: string;
		name: string;
		images: string[] | null;
		createdAt: Date;
		price: string;
		quantity: string;
		categoryId: string;
	};

const initialState: TProduct[] | any = null;

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
				state = state.map((product: TProduct) => {
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
				state = state.filter((product: TProduct) => {
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
