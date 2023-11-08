import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
	fetchCategories,
	createCategory,
	updateCategory,
	destroyCategory,
} from '../../controllers/category';
import { DocumentData } from 'firebase/firestore';
import { DocType } from '../../firebase/firestore/getData';

export type Category = Partial<DocumentData> &
	Partial<DocType> & {
		id: string;
		name: string;
		products: string[];
		createdAt: Date;
	};

const initialState: Category[] | any = null;

export const CategoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(
			fetchCategories.fulfilled,
			(state, action) => {
				state = action.payload;
				return state;
			},
		);
		builder.addCase(
			createCategory.fulfilled,
			(state, action) => {
				state = [...state, action.payload];
				return state;
			},
		);
		builder.addCase(
			updateCategory.fulfilled,
			(state, action) => {
				state = state.map((category: Category) => {
					return category.id === action.payload.id
						? action.payload
						: category;
				});
				return state;
			},
		);
		builder.addCase(
			destroyCategory.fulfilled,
			(state, action) => {
				state = state.filter((category: Category) => {
					return (
						category.id !== action.payload &&
						category
					);
				});
				return state;
			},
		);
	},
});

export const selectProfile = (state: RootState) => state;

export default CategoriesSlice.reducer;
