import { createAsyncThunk } from '@reduxjs/toolkit';
import { DocumentData, arrayUnion } from 'firebase/firestore';
import { getAllData } from '../firebase/firestore/getAllData';
import addData from '../firebase/firestore/addData';
import updateDocs from '../firebase/firestore/updateDoc';
import getData from '../firebase/firestore/getData';
import destroyDoc from '../firebase/firestore/deleteDoc';
import {
	createImagesDocument,
	destroyBannerImage,
} from './bannerImages';
import { TBanner } from '../app/store/banner';
import { isAdmin } from '../utils';

export const fetchBanners = createAsyncThunk(
	'banners/fetchBanners',
	async () => {
		try {
			const banners: DocumentData[] | undefined =
				await getAllData('banners');

			return banners as any;
		} catch (e: any) {
			console.log(e);
		}
	},
);

export const fetchActiveBanner = async () => {
	try {
		const banners = await getAllData('banners');
		const banner = banners?.filter((b) => b && b?.active);
		return (banner![0] as any) || null;
	} catch (e: any) {
		console.error(e.message);
	}
};

export const createBanner = createAsyncThunk(
	'Banners/createBanner',
	async (option: {
		name: string;
		images: FileList | null;
	}) => {
		try {
			if (!isAdmin())
				throw new Error('You Are Not Authorized');

			const { name, images } = option;
			const banner = await addData('banners', {
				name,
				active: false,
				createdAt: Date.now(),
			});

			if (images) {
				const imagesIds = await createImagesDocument(
					images,
					banner?.id,
				);
				await updateDocs('banners', banner.id, {
					images: imagesIds,
				});
			}

			// create an (id) field to store the banner (docId) inside
			await updateDocs('banners', banner.id, {
				id: banner.id,
			});

			const newBanner = (
				await getData('banners', 'id', banner?.id)
			).data as TBanner;

			return newBanner;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);

export const updateBannersActivity = createAsyncThunk(
	'Banners/updateBannerStatus',
	async (option: { bannerId: string; active: boolean }) => {
		try {
			if (!isAdmin())
				throw new Error('You Are Not Authorized');

			const { bannerId, active } = option;
			const banners: DocumentData[] | undefined =
				await getAllData('banners');

			for (const banner of banners!) {
				await updateDocs('banners', banner?.id, {
					active: false,
				});
			}
			await updateDocs('banners', bannerId, {
				active,
			});

			const updatedBanners: DocumentData[] | undefined =
				await getAllData('banners');

			return updatedBanners as any;
		} catch (e: any) {
			console.error(e.message);
		}
	},
);

export const updateBanner = createAsyncThunk(
	'banners/updateBanner',
	async (options: { docId: string; data: any }) => {
		try {
			if (!isAdmin())
				throw new Error('You Are Not Authorized');

			const { docId } = options;
			const { bannerName, images } = options.data;

			if (bannerName) {
				await updateDocs('banners', docId, {
					name: bannerName,
				});
			}

			if (images) {
				const imagesIds = await createImagesDocument(
					images,
					docId,
				);
				// update banner's images with the new images
				for (const id of imagesIds) {
					await updateDocs('banners', docId, {
						images: arrayUnion(id),
					});
				}
			}

			const banner = (
				await getData('banners', 'id', docId)
			).data as TBanner;

			return banner;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);

export const deleteBannerImageList = async (
	images: string[],
	banner: TBanner,
) => {
	try {
		if (!isAdmin())
			throw new Error('You Are Not Authorized');

		for (const image of images) {
			// find banner's images
			const bannerImage: DocumentData | undefined = (
				await getData('bannerImages', 'id', image)
			).data;
			// delete banner's images
			await destroyBannerImage(
				banner,
				bannerImage?.filename,
				banner?.id,
			);
		}
	} catch (e: any) {
		console.error(e.message);
		throw new Error(e.message);
	}
};

export const destroyBanner = createAsyncThunk(
	'banners/destroyBanner',
	async (docId: string) => {
		try {
			if (!isAdmin())
				throw new Error('You Are Not Authorized');

			const banner: DocumentData | undefined = (
				await getData('banners', 'id', docId)
			).data;
			if (banner?.images)
				deleteBannerImageList(
					banner?.images,
					banner as TBanner,
				);

			await destroyDoc('banners', docId);

			return docId;
		} catch (e: any) {
			console.log(e.message);
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);
