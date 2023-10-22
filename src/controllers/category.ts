import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllData } from '../firebase/firestore/getAllData';
import { DocumentData } from 'firebase/firestore';
import addData from '../firebase/firestore/addData';
import { uploadImage } from '../firebase/firestore/uploadFile';
import updateDocs from '../firebase/firestore/updateDoc';

export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	async () => {
		const categories: DocumentData[] | undefined =
			await getAllData('categories');

		return categories ? categories : null;
	},
);

export const fetchLatestCategories = createAsyncThunk(
	'categories/fetchLatestCategories',
	async () => {
		const categories: DocumentData[] | undefined =
			await getAllData('categories');

		const latestCategories = categories?.map((category) => {
			const todyDate = Date.now();
			const diff = todyDate - category.createdAt;
			console.log(category.createdAt);
			const days = diff / (1000 * 60 * 60 * 24);
			if (days < 7) {
				return category;
			}
		});

		return latestCategories ? latestCategories : null;
	},
);

export const createCategory = async (
	name: string,
	selectedImage: File | null,
) => {
	try {
		const category = await addData('categories', {
			name: name,
			createdAt: Date.now(),
		});
		const imageURL = await uploadImage(
			selectedImage,
			category.id,
			'categories',
		);
		await updateDocs('categories', category.id, {
			id: category.id,
			imageURL,
		});
	} catch (e) {
		throw new Error('Sorry, Something went wrong!!!');
	}
};
