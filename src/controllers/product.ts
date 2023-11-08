import { createAsyncThunk } from '@reduxjs/toolkit';
import { DocumentData, arrayUnion } from 'firebase/firestore';
import { getAllData } from '../firebase/firestore/getAllData';
import addData from '../firebase/firestore/addData';
import updateDocs from '../firebase/firestore/updateDoc';
import getData from '../firebase/firestore/getData';
import destroyDoc from '../firebase/firestore/deleteDoc';

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async () => {
		try {
			const products: DocumentData[] | undefined =
				await getAllData('products');

			return products ? products : null;
		} catch (e: any) {
			console.log(e);
		}
	},
);

export const createProduct = createAsyncThunk(
	'products/postProduct',
	async (option: { name: string; categoryId: string }) => {
		const { name, categoryId } = option;

		try {
			const product = await addData('products', {
				name,
				categoryId,
				createdAt: Date.now(),
			});

			await updateDocs('products', product.id, {
				id: product.id,
			});

			await updateDocs('categories', categoryId, {
				products: arrayUnion(product?.id),
			});

			const newProduct: DocumentData = await getData(
				'products',
				'id',
				product?.id,
			);

			return newProduct.data;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);

export const updateProduct = createAsyncThunk(
	'products/putProduct',
	async (options: { docId: string; data: any }) => {
		try {
			const { docId, data } = options;
			await updateDocs('products', docId, data);

			const product: DocumentData = await getData(
				'products',
				'id',
				docId,
			);

			return product.data;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);

export const destroyProduct = createAsyncThunk(
	'products/destroyProduct',
	async (docId: string) => {
		try {
			await destroyDoc('products', docId);

			return docId;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);
