import { createAsyncThunk } from '@reduxjs/toolkit';
import { DocumentData, arrayUnion } from 'firebase/firestore';
import { getAllData } from '../firebase/firestore/getAllData';
import addData from '../firebase/firestore/addData';
import updateDocs from '../firebase/firestore/updateDoc';
import getData from '../firebase/firestore/getData';
import destroyDoc from '../firebase/firestore/deleteDoc';
import {
	createImagesDocument,
	destroyProductImage,
} from './productImages';
import { TProduct } from '../app/store/product';
import { fetchCategory } from './category';

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

export const fetchProduct = async (productId: string) => {
	const product = await getData('products', 'id', productId);
	return product?.data;
};

export const fetchCategoryProducts = async (
	categoryId: string,
) => {
	const category = await fetchCategory(categoryId);

	const products = [];
	if (category?.products)
		for (const productId of category.products) {
			const product = (
				await getData('products', 'id', productId)
			).data;
			products.push(product);
		}

	return products;
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

			if (images) {
				const imagesIds = await createImagesDocument(
					images,
					product?.id,
				);
				await updateDocs('products', product.id, {
					images: imagesIds,
				});
			}

			// create an (id) field to store the product (docId) inside
			await updateDocs('products', product.id, {
				id: product.id,
			});

			// add the product to the targeted category
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

const updateCategoryProducts = async (productId: string) => {
	try {
		const product: DocumentData | undefined = (
			await getData('products', 'id', productId)
		).data;
		// find current category to update it
		const category: DocumentData | undefined = (
			await getData(
				'categories',
				'id',
				product?.categoryId,
			)
		).data;
		// get the product list from category
		const categoryProducts = category?.products;
		const filteredCategoryProducts =
			categoryProducts?.filter((product: string) => {
				return product !== productId && product;
			});
		// update current category
		await updateDocs('categories', category?.id, {
			products: filteredCategoryProducts,
		});
	} catch (e: any) {
		throw new Error('Sorry, Something went wrong!!!');
	}
};

export const updateProduct = createAsyncThunk(
	'products/putProduct',
	async (options: { docId: string; data: any }) => {
		try {
			const { docId } = options;
			const {
				productName,
				productPrice,
				productQuantity,
				category,
				images,
			} = options.data;

			if (productName)
				await updateDocs('products', docId, {
					name: productName,
				});
			if (productPrice)
				await updateDocs('products', docId, {
					price: productPrice,
				});
			if (productQuantity)
				await updateDocs('products', docId, {
					quantity: productQuantity,
				});
			if (category) {
				await updateCategoryProducts(docId);
				await updateDocs('categories', category, {
					products: arrayUnion(docId),
				});
				await updateDocs('products', docId, {
					categoryId: category,
				});
			}

			if (images) {
				const imagesIds = await createImagesDocument(
					images,
					docId,
				);
				// update product's images with the new images
				for (const id of imagesIds) {
					await updateDocs('products', docId, {
						images: arrayUnion(id),
					});
				}
			}

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

export const deleteProductImageList = async (
	images: string[],
	product: TProduct,
) => {
	for (const image of images) {
		// find product's images
		const productImage: DocumentData | undefined = (
			await getData('productImages', 'id', image)
		).data;
		// delete product's images
		await destroyProductImage(
			product,
			productImage?.filename,
			productImage?.id,
		);
	}
};

export const destroyProduct = createAsyncThunk(
	'products/destroyProduct',
	async (docId: string) => {
		try {
			// delete product from category's products list
			await updateCategoryProducts(docId);
			const product: DocumentData | undefined = (
				await getData('products', 'id', docId)
			).data;

			if (product?.images)
				deleteProductImageList(
					product.images,
					product as TProduct,
				);

			await destroyDoc('products', docId);

			return docId;
		} catch (e: any) {
			console.log(e.message);
			throw new Error('Sorry, Something went wrong!!!');
		}
	},
);
