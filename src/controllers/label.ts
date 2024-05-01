import { TProduct } from '../app/store/product';
import { sendRequestToServer } from '../utils';

export type TLabel = {
	value: string;
	_id: string;
	products: (TProduct | null)[];
};

export const getLabels = async () => {
	try {
		const labels: TLabel[] = await sendRequestToServer(
			'get',
			'label',
		);

		return labels;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const createLabel = async ({
	labelValue,
}: {
	labelValue: string;
}) => {
	try {
		const label: TLabel | null = await sendRequestToServer(
			'post',
			'label',
			{ labelValue },
		);

		return label;
	} catch (e: any) {
		throw new Error(e.message);
	}
};
