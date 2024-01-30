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

export const fetchBanner = async (bannerId: string) => {
	const banner = await getData('banners', 'id', bannerId);
	return banner?.data;
};

export const createBanner = createAsyncThunk(
	'Banners/createBanner',
	async (option: {
		name: string;
		images: FileList | null;
	}) => {
		const { name, images } = option;

		try {
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

export const updateBanner = createAsyncThunk(
	'banners/updateBanner',
	async (options: { docId: string; data: any }) => {
		try {
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
};

export const destroyBanner = createAsyncThunk(
	'banners/destroyBanner',
	async (docId: string) => {
		try {
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
