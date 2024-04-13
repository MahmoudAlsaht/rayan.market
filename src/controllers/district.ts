import { sendRequestToServer } from '../utils';

export type TDistrict = {
	_id: string;
	name: string;
	shippingFees: number;
};

export const fetchDistricts = async () => {
	try {
		const districts: (TDistrict | null)[] =
			await sendRequestToServer('GET', `district`);

		return districts;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const createDistrict = async ({
	name,
	shippingFees,
}: {
	name: string;
	shippingFees: string;
}) => {
	try {
		const district: TDistrict | null =
			await sendRequestToServer('POST', `district`, {
				name,
				shippingFees,
			});

		return district;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const updateDistrict = async ({
	districtId,
	name,
	shippingFees,
}: {
	districtId: string;
	name: string;
	shippingFees: string;
}) => {
	try {
		const district: TDistrict | null =
			await sendRequestToServer(
				'PUT',
				`district/${districtId}`,
				{ name, shippingFees },
			);

		return district;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const getDistrict = async () => {
	try {
		const district: TDistrict | null =
			await sendRequestToServer('GET', `district`);

		return district;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const deleteDistrict = async ({
	districtId,
}: {
	districtId: string;
}) => {
	try {
		await sendRequestToServer(
			'DELETE',
			`district/${districtId}`,
		);
		return districtId;
	} catch (e: any) {
		throw new Error(e.message);
	}
};
