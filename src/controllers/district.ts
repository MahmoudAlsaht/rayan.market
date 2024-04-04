import { sendRequestToServer } from '../utils';

export type TDistrict = {
	_id: string;
	name: string;
	shippingFees: number;
};

export const fetchDistricts = async (profileId: string) => {
	try {
		const districts: (TDistrict | null)[] =
			await sendRequestToServer(
				'GET',
				`account/${profileId}/district`,
			);

		return districts;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const createDistrict = async ({
	profileId,
	name,
	shippingFees,
}: {
	name: string;
	shippingFees: string;
	profileId: string;
}) => {
	try {
		const district: TDistrict | null =
			await sendRequestToServer(
				'POST',
				`account/${profileId}/district`,
				{ name, shippingFees },
			);

		return district;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const updateDistrict = async ({
	profileId,
	districtId,
	name,
	shippingFees,
}: {
	profileId: string;
	districtId: string;
	name: string;
	shippingFees: string;
}) => {
	try {
		const district: TDistrict | null =
			await sendRequestToServer(
				'PUT',
				`account/${profileId}/district/${districtId}`,
				{ name, shippingFees },
			);

		return district;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const getDistrict = async ({
	profileId,
}: {
	profileId: string;
}) => {
	try {
		const district: TDistrict | null =
			await sendRequestToServer(
				'GET',
				`account/${profileId}/district`,
			);

		return district;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const deleteDistrict = async ({
	profileId,
	districtId,
}: {
	districtId: string;
	profileId: string;
}) => {
	try {
		await sendRequestToServer(
			'DELETE',
			`account/${profileId}/district/${districtId}`,
		);
		return districtId;
	} catch (e: any) {
		throw new Error(e.message);
	}
};
