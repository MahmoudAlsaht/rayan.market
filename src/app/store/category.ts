import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
	fetchCategories,
	createCategory,
} from '../../controllers/category';
import { DocumentData } from 'firebase/firestore';

export type ICategory = Partial<DocumentData> & {
	id: string;
	name: string;
	products: string[];
	createdAt: Date;
};

const initialState: ICategory[] | any = null;

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
	},
});

export const selectProfile = (state: RootState) => state;

export default CategoriesSlice.reducer;
