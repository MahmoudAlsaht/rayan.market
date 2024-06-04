import { createAsyncThunk } from '@reduxjs/toolkit';
import { TBanner } from '../app/store/banner';
import { sendRequestToServer } from '../utils';

export const fetchBanners = createAsyncThunk(
	'banners/fetchBanners',
	async () => {
		try {
			const banners: (TBanner | null)[] =
				await sendRequestToServer('GET', `banner`);

			return banners;
		} catch (e: any) {
			throw new Error('something went wrong');
		}
	},
);

export const fetchBannerByType = async (type: string) => {
	try {
		const banner: TBanner | null = await sendRequestToServer(
			'post',
			`banner/type`,
			{ type },
		);

		return banner;
	} catch (e: any) {
		throw new Error('something went wrong');
	}
};

export const createBanner = createAsyncThunk(
	'Banners/createBanner',
	async (option: {
		name: string;
		images: FileList | null;
		type: string;
		category: string;
		brand: string;
	}) => {
		try {
			const { name, images, type, category, brand } =
				option;

			const formData = new FormData();
			formData.append('name', name);
			formData.append('type', type);
			formData.append('category', category);
			formData.append('brand', brand);

			if (images)
				for (const image of images) {
					formData.append('files', image as File);
				}
			const banner: TBanner | null =
				await sendRequestToServer(
					'POST',
					`banner`,
					formData,
				);

			return banner;
		} catch (e: any) {
			throw new Error('something went wrong');
		}
	},
);

export const updateBanner = createAsyncThunk(
	'banners/updateBanner',
	async (options: {
		bannerId: string;
		data: any;
		currName: string;
	}) => {
		try {
			const { bannerId } = options;
			const { bannerName, images, currName } =
				options.data;

			const formData = new FormData();
			formData.append('name', bannerName || currName);

			if (images)
				for (const image of images) {
					formData.append('files', image as File);
				}

			const banner: TBanner | null =
				await sendRequestToServer(
					'PUT',
					`banner/${bannerId}`,
					formData,
				);

			return banner;
		} catch (e: any) {
			throw new Error('something went wrong');
		}
	},
);

export const updateImageLink = createAsyncThunk(
	'banners/updateImageBannerLink',
	async (options: {
		bannerId: string;
		imageId: string;
		link: string;
		showForMobile: boolean;
	}) => {
		try {
			const { bannerId, imageId, link, showForMobile } =
				options;

			const banner: TBanner | null =
				await sendRequestToServer(
					'PUT',
					`banner/${bannerId}/images/${imageId}`,
					{ link, showForMobile },
				);

			return banner;
		} catch (e: any) {
			throw new Error('something went wrong');
		}
	},
);

export const destroyBanner = createAsyncThunk(
	'banners/destroyBanner',
	async (bannerId: string) => {
		try {
			await sendRequestToServer(
				'DELETE',
				`banner/${bannerId}`,
			);

			return bannerId;
		} catch (e: any) {
			throw new Error('something went wrong');
		}
	},
);
