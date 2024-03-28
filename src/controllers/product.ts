import { createAsyncThunk } from '@reduxjs/toolkit';
import { TProduct } from '../app/store/product';
import { sendRequestToServer } from '../utils';
import db from '../firebase/config';
import { uploadImage } from '../firebase/firestore/uploadFile';
import { TLabel } from './label';

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
		image: File | null;
		offerExpiresDate: string | null;
		labels: TLabel[] | null;
	}) => {
		const {
			name,
			categoryId,
			brandId,
			price,
			quantity,
			image,
			newPrice,
			isOffer,
			offerExpiresDate,
			labels,
		} = option;

		try {
			const imageUrl = {
				url: await uploadImage(
					image,
					`${image?.name}`,
					`products/${name}`,
				),
				fileName: image?.name,
			};

			const product: TProduct | null =
				await sendRequestToServer('POST', 'product', {
					imageUrl,
					name,
					categoryId,
					brandId,
					price: parseFloat(price),
					quantity,
					isOffer,
					newPrice: parseFloat(newPrice as string),
					offerExpiresDate,
					labels,
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
				image,
				newPrice,
				offerExpiresDate,
				isOffer,
				labels,
			} = options.data;

			console.log(image);
			let imageUrl = null;
			if (image)
				imageUrl = {
					url: await uploadImage(
						image,
						`${image?.name}`,
						`products/${name}`,
					),
					fileName: image?.name,
				};

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
						imageUrl,
						offerExpiresDate,
						isOffer,
						brand,
						labels,
					},
				);

			return product;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);

export const updateProductViews = async (productId: string) => {
	try {
		await sendRequestToServer(
			'PATCH',
			`product/${productId}`,
		);
	} catch (e) {
		throw new Error('Sorry, Something went wrong!!!');
	}
};

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
