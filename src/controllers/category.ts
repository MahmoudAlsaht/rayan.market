import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllData } from '../firebase/firestore/getAllData';
import { DocumentData } from 'firebase/firestore';
import addData from '../firebase/firestore/addData';
import updateDocs from '../firebase/firestore/updateDoc';
import getData from '../firebase/firestore/getData';
import destroyDoc from '../firebase/firestore/deleteDoc';
import { deleteProductImageList } from './product';
import { TProduct } from '../app/store/product';

export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	async () => {
		try {
			const categories: DocumentData[] | undefined =
				await getAllData('categories');

			return categories ? categories : null;
		} catch (e: any) {
			throw new Error('Sorry, Something went wrong!!!');
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

			// add docId to created category as a field
			await updateDocs('categories', category.id, {
				id: category.id,
			});

			// get category's data after adding doc id
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

const destroyCategoryProductList = async (
	products: string[],
) => {
	try {
		// loop through category's products
		for (const product of products) {
			const categoryProduct: DocumentData | undefined = (
				await getData('products', 'id', product)
			).data;

			// delete every image in current product
			if (categoryProduct?.images)
				await deleteProductImageList(
					categoryProduct.images,
					categoryProduct as TProduct,
				);

			await destroyDoc('products', product);
		}
	} catch (e: any) {
		throw new Error('Sorry, Something went wrong!!!');
	}
};

export const destroyCategory = createAsyncThunk(
	'categories/destroyCategory',
	async (docId: string) => {
		try {
			const category: DocumentData | undefined = (
				await getData('categories', 'id', docId)
			).data;
			if (category?.products)
				await destroyCategoryProductList(
					category?.products,
				);

			await destroyDoc('categories', docId);

			return docId;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);
