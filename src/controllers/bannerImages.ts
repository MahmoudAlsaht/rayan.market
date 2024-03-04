import { uploadImage } from '../firebase/firestore/uploadFile';
import { TBannerImage } from '../app/store/banner';
import { sendRequestToServer } from '../utils';

export const fetchBannersImages = async (bannerId: string) => {
	try {
		const images: (TBannerImage | null)[] =
			await sendRequestToServer(
				'GET',
				`banner/${bannerId}/images`,
			);
		return images;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const fetchPreviewImage = async (
	bannerId: string,
	imageId: string,
) => {
	try {
		const images: TBannerImage | null =
			await sendRequestToServer(
				'GET',
				`banner/${bannerId}/images/${imageId}`,
			);
		return images;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const uploadBannerImages = async (
	images: FileList | null,
	categoryId: string,
) => {
	try {
		const urls = [];
		if (images)
			for (const file of images!) {
				urls.push({
					url: await uploadImage(
						file,
						`${file.name}`,
						`banners/${categoryId}`,
					),
					fileName: file.name,
				});
			}

		return urls;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const destroyBannerImage = async (
	bannerId: string,
	imageId: string,
) => {
	try {
		await sendRequestToServer(
			'DELETE',
			`banner/${bannerId}/images/${imageId}`,
		);
	} catch (e: any) {
		throw new Error(e.message);
	}
};
