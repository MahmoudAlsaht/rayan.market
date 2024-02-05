import getData from '../firebase/firestore/getData';
import { uploadImage } from '../firebase/firestore/uploadFile';
import addData from '../firebase/firestore/addData';
import updateDocs from '../firebase/firestore/updateDoc';
import destroyDoc from '../firebase/firestore/deleteDoc';
import { deleteImage } from '../firebase/firestore/deleteFile';
import { TBanner } from '../app/store/banner';
import { isAdmin } from '../utils';

export const fetchBannersImages = async (
	imagesIds: string[] | null,
) => {
	try {
		const images = [];
		if (imagesIds && imagesIds.length)
			for (const id of imagesIds) {
				const image = await getData(
					'bannerImages',
					'id',
					id,
				);
				images.push(image.data);
			}
		return images ? (images as any) : null;
	} catch (e: any) {
		throw new Error('Something went wrong');
	}
};

export const fetchPreviewImage = async (imageId: string) => {
	try {
		const image = await getData(
			'bannerImages',
			'id',
			imageId,
		);
		return image?.data?.path;
	} catch (e: any) {
		throw new Error('Something went wrong!');
	}
};

const uploadBannerImages = async (
	images: FileList | null,
	bannerId: string,
) => {
	try {
		if (!isAdmin())
			throw new Error('You Are Not Authorized');

		const urls = [];
		for (const file of images!) {
			urls.push({
				url: await uploadImage(
					file,
					`${file.name}`,
					`banners/${bannerId}`,
				),
				filename: file.name,
			});
		}

		return urls;
	} catch (e: any) {
		throw new Error('Something went wrong');
	}
};

export const createImagesDocument = async (
	images: FileList | null,
	bannerId: string,
) => {
	try {
		if (!isAdmin())
			throw new Error('You Are Not Authorized');

		const imagesUrls = await uploadBannerImages(
			images,
			bannerId,
		);

		const imagesIds = [];
		for (const imageUrl of imagesUrls) {
			const { url, filename } = imageUrl;
			const data = {
				filename: filename,
				path: url,
				banner: bannerId,
			};
			const image = await addData('bannerImages', data);

			// create an (id) field to store the images (docId) inside
			await updateDocs('bannerImages', image.id, {
				id: image.id,
			});

			// save the images ids in array to pass to the banner document
			imagesIds.push(image.id);
		}
		return imagesIds;
	} catch (e: any) {
		throw new Error('Something went wrong');
	}
};

export const destroyBannerImage = async (
	banner: TBanner,
	filename: string,
	imageId: string,
) => {
	try {
		if (!isAdmin())
			throw new Error('You Are Not Authorized');

		// delete the image from banner's images list
		const images = banner?.images?.filter(
			(image) => image !== imageId && image,
		);
		// update banner document with the filtered images
		await updateDocs('banners', banner?.id, { images });

		await destroyDoc('bannerImages', imageId);

		await deleteImage(filename, `banners/${banner?.id}`);
	} catch (e: any) {
		throw new Error('Something went wrong');
	}
};
