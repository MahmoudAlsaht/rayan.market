import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { fetchProductsImages } from '../../controllers/productImages';
import { DocumentData } from 'firebase/firestore';

export type TImage = DocumentData & {
	filename: string;
	path: string;
	id: string;
	product: string;
};

const initialState: TImage[] | any = null;

export const ImagesSlice = createSlice({
	name: 'images',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(
			fetchProductsImages.fulfilled,
			(state, action) => {
				state = action.payload;
				return state;
			},
		);
	},
});

export const selectProfile = (state: RootState) => state;

export default ImagesSlice.reducer;
