import { createAsyncThunk } from '@reduxjs/toolkit';
import { uploadProductImages } from './productImages';
import { TProduct } from '../app/store/product';
import { sendRequestToServer } from '../utils';
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

export const fetchFilteredProducts = async () => {
	try {
		const products: (TProduct | null)[] =
			await sendRequestToServer(
				'GET',
				`product/filter-products`,
			);

		return products;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

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

export const createProduct = createAsyncThunk(
	'products/postProduct',
	async (option: {
		name: string;
		categoryId: string;
		brandId: string;
		price: string;
		newPrice: string | null;
		isOffer: boolean;
		quantity: string;
		images: FileList | null;
		offerExpiresDate: string | null;
	}) => {
		const {
			name,
			categoryId,
			brandId,
			price,
			quantity,
			images,
			newPrice,
			isOffer,
			offerExpiresDate,
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
					brandId,
					price: parseFloat(price),
					quantity,
					isOffer,
					newPrice: parseFloat(newPrice as string),
					offerExpiresDate,
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
			const { productId } = options;
			const {
				name,
				price,
				quantity,
				category,
				brand,
				images,
				newPrice,
				offerExpiresDate,
				isOffer,
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
						offerExpiresDate,
						isOffer,
						brand,
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
