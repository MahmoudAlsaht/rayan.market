import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequestToServer } from '../utils';
import { TCategory } from '../app/store/category';

export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	async () => {
		try {
			const categories: (TCategory | null)[] =
				await sendRequestToServer('GET', `category`);

			return categories;
		} catch (e: any) {
			throw new Error('something went wrong');
		}
	},
);

export const fetchCategory = async (categoryId: string) => {
	try {
		const categories: TCategory | null =
			await sendRequestToServer(
				'GET',
				`category/${categoryId}`,
			);

		return categories;
	} catch (e: any) {
		throw new Error('something went wrong');
	}
};

export const createCategory = createAsyncThunk(
	'categories/postCategory',
	async ({
		name,
		file,
	}: {
		name: string;
		file: File | null;
	}) => {
		try {
			const formData = new FormData();
			formData.append('name', name);
			formData.append('file', file as File);
			const category: TCategory | null =
				await sendRequestToServer(
					'POST',
					`category`,
					formData,
				);

			return category;
		} catch (e: any) {
			throw new Error('something went wrong');
		}
	},
);

export const updateCategory = createAsyncThunk(
	'categories/putCategory',
	async (options: {
		categoryId: string;
		name: string;
		file: File | null;
	}) => {
		try {
			const { categoryId, name, file } = options;

			const formData = new FormData();

			formData.append('name', name);
			formData.append('file', file as File);

			const category: TCategory | null =
				await sendRequestToServer(
					'PUT',
					`category/${categoryId}`,
					formData,
				);

			return category;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);

export const destroyCategory = createAsyncThunk(
	'categories/destroyCategory',
	async (categoryId: string) => {
		try {
			await sendRequestToServer(
				'DELETE',
				`category/${categoryId}`,
			);
			return categoryId;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);
