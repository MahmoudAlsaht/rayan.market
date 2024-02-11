import { createAsyncThunk } from '@reduxjs/toolkit';
import { uploadProductImages } from './productImages';
import { TProduct } from '../app/store/product';
import { isAdmin, sendRequestToServer } from '../utils';
import db from '../firebase/config';

db();

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async () => {
		try {
			const products: (TProduct | null)[] =
				await sendRequestToServer('GET', `product`);

			return products;
		} catch (e: any) {
			throw new Error(e.message);
		}
	},
);

export const fetchOffers = async () => {
	try {
		const fetchedProducts: (TProduct | null)[] =
			await sendRequestToServer('GET', `product`);

		const products: (TProduct | null)[] =
			fetchedProducts?.filter(
				(product) => product?.isOffer && product,
			);
		return products;
	} catch (e: any) {
		console.log(e);
	}
};

export const fetchProduct = async (productId: string) => {
	try {
		const product: TProduct | null =
			await sendRequestToServer(
				'GET',
				`product/${productId}`,
			);
		return product;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const fetchCategoryProducts = async (
	categoryId: string,
) => {
	try {
		const products: (TProduct | null)[] =
			await sendRequestToServer(
				'GET',
				`category/${categoryId}/products`,
			);

		return products;
	} catch (e: any) {
		console.log(e);
	}
};

export const createProduct = createAsyncThunk(
	'products/postProduct',
	async (option: {
		name: string;
		categoryId: string;
		price: string;
		newPrice: string | null;
		isOffer: boolean;
		quantity: string;
		images: FileList | null;
	}) => {
		if (!isAdmin())
			throw new Error('You Are Not Authorized');

		const {
			name,
			categoryId,
			price,
			quantity,
			images,
			newPrice,
			isOffer,
		} = option;

		try {
			const imagesUrls = await uploadProductImages(
				images,
				categoryId,
			);

			const product: TProduct | null =
				await sendRequestToServer('POST', 'product', {
					imagesUrls,
					name,
					categoryId,
					price,
					quantity,
					isOffer,
					newPrice,
				});

			return product;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);

export const updateProduct = createAsyncThunk(
	'products/putProduct',
	async (options: { productId: string; data: any }) => {
		try {
			if (!isAdmin())
				throw new Error('You Are Not Authorized');

			const { productId } = options;
			const {
				name,
				price,
				quantity,
				category,
				images,
				newPrice,
			} = options.data;

			const imagesUrls = await uploadProductImages(
				images,
				category,
			);

			const product: TProduct | null =
				await sendRequestToServer(
					'PUT',
					`product/${productId}`,
					{
						name,
						price,
						newPrice,
						quantity,
						category,
						imagesUrls,
					},
				);

			return product;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);

export const destroyProduct = createAsyncThunk(
	'products/destroyProduct',
	async (productId: string) => {
		try {
			if (!isAdmin())
				throw new Error('You Are Not Authorized');

			await sendRequestToServer(
				'DELETE',
				`product/${productId}`,
			);

			return productId;
		} catch (e: any) {
			console.log(e.message);
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);
