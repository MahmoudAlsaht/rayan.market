import { TProfile } from '../app/auth/profile';
import { sendRequestToServer } from '../utils';
import { TDistrict } from './district';

export type TContactInfo = {
	_id: string;
	district: TDistrict;
	contactNumber: string;
	profile: TProfile;
};

export const getContactsData = async (profileId: string) => {
	try {
		const contacts: (TContactInfo | null)[] =
			await sendRequestToServer(
				'GET',
				`account/${profileId}/contacts`,
			);

		return contacts;
	} catch (e: any) {
		console.error(e.message);
		throw new Error(e.message);
	}
};

export const getContactData = async (
	profileId: string,
	contactId: string,
) => {
	try {
		const contact: TContactInfo | null =
			await sendRequestToServer(
				`GET`,
				`account/${profileId}/contacts/${contactId}`,
			);
		return contact as TContactInfo;
	} catch (e) {
		console.error(e);
	}
};

export const createNewContactInfo = async (
	profileId: string,
	{
		district,
		contactNumber,
	}: { district: string; contactNumber: string },
) => {
	try {
		const contact: TContactInfo | null =
			await sendRequestToServer(
				'POST',
				`account/${profileId}/contacts`,
				{ district, contactNumber },
			);

		return contact;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const updateUserContactInfo = async ({
	data,
	contactId,
	profileId,
}: {
	data: {
		district: string;
		contactNumber: string;
	};
	contactId: string;
	profileId: string;
}) => {
	try {
		const { district, contactNumber } = data;

		const contact: TContactInfo | null =
			await sendRequestToServer(
				'PUT',
				`account/${profileId}/contacts/${contactId}`,
				{ district, contactNumber },
			);

		return contact;
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const deleteContact = async (
	profileId: string,
	contactId: string,
) => {
	try {
		await sendRequestToServer(
			'DELETE',
			`account/${profileId}/contacts/${contactId}`,
		);

		return contactId;
	} catch (e: any) {
		throw new Error(e.message);
	}
};
