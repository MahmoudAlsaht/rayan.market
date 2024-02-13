import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAdmin, sendRequestToServer } from '../utils';
import { TCategory } from '../app/store/category';

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
	async (name: string) => {
		try {
			if (!isAdmin())
				throw new Error('You Are Not Authorized');

			const category: TCategory | null =
				await sendRequestToServer('POST', `category`, {
					name,
				});

			return category;
		} catch (e: any) {
			throw new Error(e.message);
		}
	},
);

export const updateCategory = createAsyncThunk(
	'categories/putCategory',
	async (options: { categoryId: string; name: string }) => {
		try {
			const { categoryId, name } = options;
			if (!isAdmin())
				throw new Error('You Are Not Authorized');

			const category: TCategory | null =
				await sendRequestToServer(
					'PUT',
					`category/${categoryId}`,
					{
						name,
					},
				);

			return category;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);

// const destroyCategoryProductList = async (
// 	products: string[],
// ) => {
// 	try {
// 		if (!isAdmin())
// 			throw new Error('You Are Not Authorized');

// 		// loop through category's products
// 		for (const product of products) {
// 			const categoryProduct: DocumentData | undefined = (
// 				await getData('products', 'id', product)
// 			).data;

// 			// delete every image in current product
// 			if (categoryProduct?.images)
// 				await deleteProductImageList(
// 					categoryProduct.images,
// 					categoryProduct as TProduct,
// 				);

// 			await destroyDoc('products', product);
// 		}
// 	} catch (e: any) {
// 		throw new Error('Sorry, Something went wrong!!!');
// 	}
// };

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
