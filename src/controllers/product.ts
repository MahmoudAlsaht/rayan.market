import { createAsyncThunk } from '@reduxjs/toolkit';
import { DocumentData, arrayUnion } from 'firebase/firestore';
import { getAllData } from '../firebase/firestore/getAllData';
import addData from '../firebase/firestore/addData';
import updateDocs from '../firebase/firestore/updateDoc';
import getData from '../firebase/firestore/getData';
import destroyDoc from '../firebase/firestore/deleteDoc';
import { uploadImage } from '../firebase/firestore/uploadFile';

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async () => {
		try {
			const products: DocumentData[] | undefined =
				await getAllData('products');

			return products ? products : null;
		} catch (e: any) {
			console.log(e);
		}
	},
);

export const uploadProductImages = async (
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

const createImagesDocument = async (
	images: FileList | null,
	productId: string,
) => {
	const imagesUrls = await uploadProductImages(
		images,
		productId,
	);

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
	}
};

export const createProduct = createAsyncThunk(
	'products/postProduct',
	async (option: {
		name: string;
		categoryId: string;
		price: string;
		quantity: string;
		images: FileList | null;
	}) => {
		const { name, categoryId, price, quantity, images } =
			option;

		try {
			const product = await addData('products', {
				name,
				categoryId,
				price,
				quantity,
				createdAt: Date.now(),
			});

			await createImagesDocument(images, product?.id);

			const allImages: DocumentData[] | undefined =
				await getAllData('productImages');

			const productsImages = allImages?.map((image) => {
				if (image.product === product?.id) return image;
			});

			console.log(allImages);

			await updateDocs('products', product.id, {
				id: product.id,
				images: productsImages?.map(
					(image) => image?.id,
				),
			});

			await updateDocs('categories', categoryId, {
				products: arrayUnion(product?.id),
			});

			const newProduct: DocumentData = await getData(
				'products',
				'id',
				product?.id,
			);

			return newProduct.data;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);

export const updateProduct = createAsyncThunk(
	'products/putProduct',
	async (options: { docId: string; data: any }) => {
		try {
			const { docId, data } = options;
			await updateDocs('products', docId, data);

			const product: DocumentData = await getData(
				'products',
				'id',
				docId,
			);

			return product.data;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);

export const destroyProduct = createAsyncThunk(
	'products/destroyProduct',
	async (docId: string) => {
		try {
			await destroyDoc('products', docId);

			return docId;
		} catch (e) {
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);
