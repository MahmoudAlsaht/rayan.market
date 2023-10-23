import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllData } from '../firebase/firestore/getAllData';
import { DocumentData } from 'firebase/firestore';
import addData from '../firebase/firestore/addData';
import updateDocs from '../firebase/firestore/updateDoc';

export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	async () => {
		const categories: DocumentData[] | undefined =
			await getAllData('categories');

		return categories ? categories : null;
	},
);

export const createCategory = async (name: string) => {
	try {
		const category = await addData('categories', {
			name: name,
			createdAt: Date.now(),
		});
		await updateDocs('categories', category.id, {
			id: category.id,
		});
	} catch (e) {
		throw new Error('Sorry, Something went wrong!!!');
	}
};
