import getData from '../firebase/firestore/getData';
import { uploadImage } from '../firebase/firestore/uploadFile';
import addData from '../firebase/firestore/addData';
import updateDocs from '../firebase/firestore/updateDoc';

export const fetchProductsImages = async (
	imagesIds: string[] | null,
) => {
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
};

const uploadProductImages = async (
	images: FileList | null,
	productId: string,
) => {
	const urls = [];
	for (const file of images!) {
		urls.push({
			url: await uploadImage(
				file,
				`${file.name}`,
				`products/${productId}`,
			),
			filename: `products/${productId}/${file.name}`,
		});
	}

	return urls;
};

export const createImagesDocument = async (
	images: FileList | null,
	productId: string,
) => {
	const imagesUrls = await uploadProductImages(
		images,
		productId,
	);

	const imagesIds = [];
	for (const imageUrl of imagesUrls) {
		const { url, filename } = imageUrl;
		const data = {
			filename: filename,
			path: url,
			product: productId,
		};
		const image = await addData('productImages', data);
		await updateDocs('productImages', image.id, {
			id: image.id,
		});
		imagesIds.push(image.id);
	}
	return imagesIds;
};
