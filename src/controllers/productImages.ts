import { uploadImage } from '../firebase/firestore/uploadFile';
import { TProductImage } from '../app/store/product';
import { isAdmin, sendRequestToServer } from '../utils';

export const fetchProductsImages = async (productId: string) => {
	try {
		const images: (TProductImage | null)[] =
			await sendRequestToServer(
				'GET',
				`product/${productId}/images`,
			);
		return images;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const fetchPreviewImage = async (
	productId: string,
	imageId: string,
) => {
	try {
		const images: TProductImage | null =
			await sendRequestToServer(
				'GET',
				`product/${productId}/images/${imageId}`,
			);
		return images;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const uploadProductImages = async (
	images: FileList | null,
	categoryId: string,
) => {
	try {
		if (!isAdmin())
			throw new Error('You Are Not Authorized');

		const urls = [];
		if (images)
			for (const file of images!) {
				urls.push({
					url: await uploadImage(
						file,
						`${file.name}`,
						`products/${categoryId}`,
					),
					fileName: file.name,
				});
			}

		return urls;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const destroyProductImage = async (
	productId: string,
	imageId: string,
) => {
	try {
		if (!isAdmin())
			throw new Error('You Are Not Authorized');
		await sendRequestToServer(
			'DELETE',
			`product/${productId}/images/${imageId}`,
		);
	} catch (e: any) {
		throw new Error(e.message);
	}
};
