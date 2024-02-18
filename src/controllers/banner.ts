import { createAsyncThunk } from '@reduxjs/toolkit';
import { uploadBannerImages } from './bannerImages';
import { TBanner } from '../app/store/banner';
import { isAdmin, isStaff, sendRequestToServer } from '../utils';
import db from '../firebase/config';

db();

export const fetchBanners = createAsyncThunk(
	'banners/fetchBanners',
	async () => {
		try {
			const banners: (TBanner | null)[] =
				await sendRequestToServer('GET', `banner`);

			return banners;
		} catch (e: any) {
			throw new Error(e.message);
		}
	},
);

export const fetchActiveBanner = async () => {
	try {
		const banners: (TBanner | null)[] =
			await sendRequestToServer('GET', `banner`);
		const banner = banners?.filter((b) => b && b?.active);
		return (banner![0] as TBanner) || null;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const createBanner = createAsyncThunk(
	'Banners/createBanner',
	async (option: {
		name: string;
		images: FileList | null;
	}) => {
		try {
			if (!isAdmin() || !isStaff())
				throw new Error('You Are Not Authorized');

			const { name, images } = option;

			const imagesUrls = await uploadBannerImages(
				images,
				name,
			);
			const banner: TBanner | null =
				await sendRequestToServer('POST', `banner`, {
					name,
					imagesUrls,
				});

			return banner;
		} catch (e: any) {
			throw new Error(e.message);
		}
	},
);

export const updateBannersActivity = createAsyncThunk(
	'Banners/updateBannerStatus',
	async (option: { bannerId: string; active: boolean }) => {
		try {
			if (!isAdmin() || !isStaff())
				throw new Error('You Are Not Authorized');

			const { bannerId, active } = option;

			const banners: (TBanner | null)[] =
				await sendRequestToServer(
					'PATCH',
					`banner/${bannerId}`,
					{ active },
				);

			return banners;
		} catch (e: any) {
			throw new Error(e.message);
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
			if (!isAdmin() || !isStaff())
				throw new Error('You Are Not Authorized');

			const { bannerId } = options;
			const { bannerName, images, currName } =
				options.data;

			const imagesUrls = await uploadBannerImages(
				images,
				bannerName || currName,
			);

			const banner: TBanner | null =
				await sendRequestToServer(
					'PUT',
					`banner/${bannerId}`,
					{ imagesUrls, name: bannerName || currName },
				);

			return banner;
		} catch (e: any) {
			throw new Error(e.message);
		}
	},
);

export const updateImageLink = createAsyncThunk(
	'banners/updateImageBannerLink',
	async (options: {
		bannerId: string;
		imageId: string;
		link: string;
	}) => {
		try {
			if (!isAdmin() || !isStaff())
				throw new Error('You Are Not Authorized');

			const { bannerId, imageId, link } = options;

			const banner: TBanner | null =
				await sendRequestToServer(
					'PUT',
					`banner/${bannerId}/images/${imageId}`,
					{ link },
				);

			return banner;
		} catch (e: any) {
			throw new Error(e.message);
		}
	},
);

export const destroyBanner = createAsyncThunk(
	'banners/destroyBanner',
	async (bannerId: string) => {
		try {
			if (!isAdmin() || !isStaff())
				throw new Error('You Are Not Authorized');

			await sendRequestToServer(
				'DELETE',
				`banner/${bannerId}`,
			);

			return bannerId;
		} catch (e: any) {
			throw new Error(e.message);
		}
	},
);
