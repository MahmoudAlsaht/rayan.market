import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequestToServer } from '../utils';
import { TBrand } from '../app/store/brand';

export const fetchBrands = createAsyncThunk(
	'brands/fetchBrands',
	async () => {
		try {
			const brands: (TBrand | null)[] =
				await sendRequestToServer('GET', `brand`);

			return brands;
		} catch (e: any) {
			throw new Error('something went wrong');
		}
	},
);

export const fetchBrand = async (brandId: string) => {
	try {
		const brands: TBrand | null = await sendRequestToServer(
			'GET',
			`brand/${brandId}`,
		);

		return brands;
	} catch (e: any) {
		throw new Error('something went wrong');
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
			const formData = new FormData();

			formData.append('name', name);
			formData.append('file', file as File);

			const brand: TBrand | null =
				await sendRequestToServer(
					'POST',
					`brand`,
					formData,
				);

			return brand;
		} catch (e: any) {
			throw new Error('something went wrong');
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
			const formData = new FormData();
			formData.append('name', name);
			formData.append('file', file as File);

			const brand: TBrand | null =
				await sendRequestToServer(
					'PUT',
					`brand/${brandId}`,
					formData,
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
