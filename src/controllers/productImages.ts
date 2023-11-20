import getData from '../firebase/firestore/getData';
import { uploadImage } from '../firebase/firestore/uploadFile';
import addData from '../firebase/firestore/addData';
import updateDocs from '../firebase/firestore/updateDoc';
import { TProduct } from '../app/store/product';
import destroyDoc from '../firebase/firestore/deleteDoc';
import { deleteImage } from '../firebase/firestore/deleteFile';

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
		throw new Error('Something went wrong');
	}
};

const uploadProductImages = async (
	images: FileList | null,
	productId: string,
) => {
	try {
		const urls = [];
		for (const file of images!) {
			urls.push({
				url: await uploadImage(
					file,
					`${file.name}`,
					`products/${productId}`,
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
	productId: string,
) => {
	try {
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

			// create an (id) field to store the images (docId) inside
			await updateDocs('productImages', image.id, {
				id: image.id,
			});

			// save the images ids in array to pass to the product document
			imagesIds.push(image.id);
		}
		return imagesIds;
	} catch (e: any) {
		throw new Error('Something went wrong');
	}
};

export const destroyProductImage = async (
	product: TProduct,
	filename: string,
	imageId: string,
) => {
	try {
		// delete the image from product's images list
		const images = product?.images?.filter(
			(image) => image !== imageId && image,
		);
		// update product document with the filtered images
		await updateDocs('products', product?.id, { images });

		await destroyDoc('productImages', imageId);

		await deleteImage(filename, `products/${product?.id}`);
	} catch (e: any) {
		throw new Error('Something went wrong');
	}
};
