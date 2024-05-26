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
		throw new Error('something went wrong');
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
		throw new Error('something went wrong');
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
		throw new Error('something went wrong');
	}
};
