import { TProduct } from '../app/store/product';
import { sendRequestToServer } from '../utils';

export type TProductOption = {
	_id: string;
	type: string;
	optionName: string;
	price?: number | null;
	quantity?: number | null;
	product: TProduct;
	description?: string | null;
};

export const getProductOptions = async (productId: string) => {
	try {
		const productOptions: (TProductOption | null)[] =
			await sendRequestToServer(
				'get',
				`product/${productId}/product-options`,
			);

		return productOptions;
	} catch (e: any) {
		throw new Error(e);
	}
};

export const createProductOption = async ({
	productId,
	optionName,
	optionPrice,
	optionQuantity,
	optionType,
}: {
	productId: string;
	optionType: string;
	optionName: string;
	optionPrice: string;
	optionQuantity: string;
}) => {
	try {
		const productOption: TProductOption | null =
			await sendRequestToServer(
				'post',
				`product/${productId}/product-options`,
				{
					optionName,
					optionPrice,
					optionQuantity,
					optionType,
				},
			);

		return productOption;
	} catch (e: any) {
		throw new Error(e);
	}
};

export const updateProductOption = async ({
	productId,
	productOptionId,
	optionName,
	optionPrice,
	optionQuantity,
}: {
	productId: string;
	productOptionId: string;
	optionName: string;
	optionPrice: string;
	optionQuantity: string;
}) => {
	try {
		const productOption: TProductOption | null =
			await sendRequestToServer(
				'put',
				`product/${productId}/product-options/${productOptionId}`,
				{
					optionName,
					optionPrice,
					optionQuantity,
				},
			);

		return productOption;
	} catch (e: any) {
		throw new Error(e);
	}
};

export const deleteProductOption = async ({
	productId,
	productOptionId,
}: {
	productId: string;
	productOptionId: string;
}) => {
	try {
		const deletedProductOptionId: string =
			await sendRequestToServer(
				'delete',
				`product/${productId}/product-options/${productOptionId}`,
			);

		return deletedProductOptionId;
	} catch (e: any) {
		throw new Error(e);
	}
};
