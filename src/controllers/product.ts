/* eslint-disable no-mixed-spaces-and-tabs */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TProduct } from '../app/store/product';
import { sendRequestToServer } from '../utils';
import { TLabel } from './label';

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

export const sortProducts = async (
	productsLength: number,
	sortBasedOn: string,
	labelId?: string,
	productId?: string,
) => {
	try {
		const products: (TProduct | null)[] =
			await sendRequestToServer('GET', `product`);

		const label: TLabel | null = await sendRequestToServer(
			'get',
			`label/${labelId}`,
		);

		let sortedProducts: (TProduct | null)[] = [null];

		if (sortBasedOn === 'views') {
			sortedProducts = products.toSorted((a, b) =>
				b != null && a != null
					? b.views - a.views
					: 0 - 0,
			);
		} else if (sortBasedOn === 'purchases') {
			sortedProducts = products.toSorted((a, b) =>
				b != null && a != null
					? b.numberOfPurchases - a.numberOfPurchases
					: 0 - 0,
			);
		} else if (label?.products) {
			sortedProducts = label.products.filter((product) => {
				return product?._id !== productId && product;
			});
		} else {
			sortedProducts = products;
		}

		return sortedProducts;
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
		image: File | null;
		offerExpiresDate: string | null;
		labels: TLabel[] | null;
		startDate: string | undefined;
		endDate: string | undefined;
		isEndDate: boolean;
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
			startDate,
			endDate,
			isEndDate,
		} = option;

		try {
			const formData = new FormData();

			formData.append('file', image as File);
			formData.append('name', name);
			formData.append('categoryId', categoryId);
			formData.append('brandId', brandId);
			formData.append('price', `${parseFloat(price)}`);
			formData.append('quantity', quantity);
			formData.append('isOffer', `${isOffer}`);
			formData.append(
				'newPrice',
				`${parseFloat(newPrice as string)}`,
			);
			formData.append(
				'offerExpiresDate',
				offerExpiresDate as string,
			);

			if (labels)
				if (labels.length > 1)
					for (const label of labels!) {
						formData.append(
							'labels',
							label?._id as string,
						);
					}
				else
					formData.append(
						'label',
						labels[0]?._id as string,
					);
			formData.append('startDate', startDate as string);
			formData.append('endDate', endDate as string);
			formData.append('isEndDate', `${isEndDate}`);

			const product: TProduct | null =
				await sendRequestToServer(
					'POST',
					'product',
					formData,
				);

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
				categoryId,
				brandId,
				price,
				quantity,
				image,
				newPrice,
				isOffer,
				offerExpiresDate,
				labels,
				startDate,
				endDate,
				isEndDate,
			} = options.data;

			const formData = new FormData();

			formData.append('file', image as File);
			formData.append('name', name);
			formData.append('categoryId', categoryId);
			formData.append('brandId', brandId);
			formData.append('price', `${parseFloat(price)}`);
			formData.append('quantity', quantity);
			formData.append('isOffer', `${isOffer}`);
			formData.append(
				'newPrice',
				`${parseFloat(newPrice as string)}`,
			);
			formData.append(
				'offerExpiresDate',
				offerExpiresDate as string,
			);
			if (labels)
				if (labels.length > 1)
					for (const label of labels!) {
						formData.append(
							'labels',
							label?._id as string,
						);
					}
				else
					formData.append(
						'label',
						labels[0]?._id as string,
					);
			formData.append('startDate', startDate as string);
			formData.append('endDate', endDate as string);
			formData.append('isEndDate', `${isEndDate}`);

			const product: TProduct | null =
				await sendRequestToServer(
					'PUT',
					`product/${productId}`,
					formData,
				);

			return product;
		} catch (e) {
			console.log(e);
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
