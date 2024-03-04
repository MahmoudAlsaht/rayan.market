import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequestToServer } from '../utils';
import { TBrand } from '../app/store/brand';
import { TProduct } from '../app/store/product';
import { uploadImage } from '../firebase/firestore/uploadFile';

export const fetchBrands = createAsyncThunk(
	'brands/fetchBrands',
	async () => {
		try {
			const brands: (TBrand | null)[] =
				await sendRequestToServer('GET', `brand`);

			return brands;
		} catch (e: any) {
			throw new Error(e.message);
		}
	},
);

export const filterProductsBasedOnBrand = (
	allProducts: (TProduct | null)[],
	brandId: string,
) => {
	const products = allProducts.filter(
		(product) => product?.brand?._id === brandId,
	);

	return products;
};

export const fetchBrand = async (brandId: string) => {
	try {
		const brands: TBrand | null = await sendRequestToServer(
			'GET',
			`brand/${brandId}`,
		);

		return brands;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const createBrand = createAsyncThunk(
	'brands/postBrand',
	async ({
		name,
		file,
	}: {
		name: string;
		file: File | null;
	}) => {
		try {
			const imageUrl = {
				url: await uploadImage(
					file,
					`${file?.name}`,
					`brands/${name}`,
				),
				fileName: file?.name,
			};

			const brand: TBrand | null =
				await sendRequestToServer('POST', `brand`, {
					name,
					imageUrl,
				});

			return brand;
		} catch (e: any) {
			throw new Error(e.message);
		}
	},
);

export const updateBrand = createAsyncThunk(
	'brands/putBrand',
	async (options: {
		brandId: string;
		name: string;
		file: File | null;
	}) => {
		try {
			const { brandId, name, file } = options;
			const imageUrl = {
				url: await uploadImage(
					file,
					`${file?.name}`,
					`brands/${name}`,
				),
				fileName: file?.name,
			};

			const brand: TBrand | null =
				await sendRequestToServer(
					'PUT',
					`brand/${brandId}`,
					{
						name,
						imageUrl,
					},
				);

			return brand;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);

export const destroyBrand = createAsyncThunk(
	'brands/destroyBrand',
	async (brandId: string) => {
		try {
			await sendRequestToServer(
				'DELETE',
				`brand/${brandId}`,
			);
			return brandId;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);
