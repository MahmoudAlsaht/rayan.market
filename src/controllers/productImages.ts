import { createAsyncThunk } from '@reduxjs/toolkit';
import getData from '../firebase/firestore/getData';

export const fetchProductsImages = createAsyncThunk(
	'images/fetchProductsImages',
	async (imagesIds: string[] | null) => {
		try {
			const images = [];
			if (imagesIds && imagesIds.length)
				for (const id of imagesIds) {
					const image = await getData(
						'productImages',
						'id',
						id,
					);
					images.push(image.data);
				}
			return images ? images : null;
		} catch (e: any) {
			console.log(e);
		}
	},
);
