import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAdmin, sendRequestToServer } from '../utils';
import { TCategory } from '../app/store/category';
import { TProduct } from '../app/store/product';
import { uploadImage } from '../firebase/firestore/uploadFile';

export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	async () => {
		try {
			const categories: (TCategory | null)[] =
				await sendRequestToServer('GET', `category`);

			return categories;
		} catch (e: any) {
			throw new Error(e.message);
		}
	},
);

export const filterProductsBasedOnCategory = (
	allProducts: (TProduct | null)[],
	categoryId: string,
) => {
	const products = allProducts.filter(
		(product) => product?.category?._id === categoryId,
	);

	return products;
};

export const fetchCategory = async (categoryId: string) => {
	try {
		const categories: TCategory | null =
			await sendRequestToServer(
				'GET',
				`category/${categoryId}`,
			);

		return categories;
	} catch (e: any) {
		throw new Error(e.message);
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
			if (!isAdmin())
				throw new Error('You Are Not Authorized');

			const imageUrl = {
				url: await uploadImage(
					file,
					`${file?.name}`,
					`categories/${name}`,
				),
				fileName: file?.name,
			};

			const category: TCategory | null =
				await sendRequestToServer('POST', `category`, {
					name,
					imageUrl,
				});

			return category;
		} catch (e: any) {
			throw new Error(e.message);
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
			if (!isAdmin())
				throw new Error('You Are Not Authorized');

			const imageUrl = {
				url: await uploadImage(
					file,
					`${file?.name}`,
					`categories/${name}`,
				),
				fileName: file?.name,
			};

			const category: TCategory | null =
				await sendRequestToServer(
					'PUT',
					`category/${categoryId}`,
					{
						name,
						imageUrl,
					},
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
			if (!isAdmin())
				throw new Error('You Are Not Authorized');

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
