import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllData } from '../firebase/firestore/getAllData';
import { DocumentData } from 'firebase/firestore';
import addData from '../firebase/firestore/addData';
import updateDocs from '../firebase/firestore/updateDoc';
import getData from '../firebase/firestore/getData';
import destroyDoc from '../firebase/firestore/deleteDoc';

export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	async () => {
		try {
			const categories: DocumentData[] | undefined =
				await getAllData('categories');

			return categories ? categories : null;
		} catch (e: any) {
			console.log(e);
		}
	},
);

export const createCategory = createAsyncThunk(
	'categories/postCategory',
	async (name: string) => {
		try {
			const category = await addData('categories', {
				name: name,
				createdAt: Date.now(),
			});
			await updateDocs('categories', category.id, {
				id: category.id,
			});

			const newCategory: DocumentData = await getData(
				'categories',
				'id',
				category?.id,
			);

			return newCategory.data;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);

export const updateCategory = createAsyncThunk(
	'categories/putCategory',
	async (options: { docId: string; data: any }) => {
		try {
			const { docId, data } = options;
			await updateDocs('categories', docId, data);

			const category: DocumentData = await getData(
				'categories',
				'id',
				docId,
			);

			return category.data;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);

export const destroyCategory = createAsyncThunk(
	'categories/destroyCategory',
	async (docId: string) => {
		try {
			await destroyDoc('categories', docId);

			return docId;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);
