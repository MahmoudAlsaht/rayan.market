import { TProfile } from '../app/auth/profile';
import { isAuthenticated, sendRequestToServer } from '../utils';

export type TContactInfo = {
	_id: string;
	address: {
		city: string;
		street: string;
	};
	contactNumber: string;
	profile: TProfile;
};

export const getContactsData = async (profileId: string) => {
	try {
		if (!isAuthenticated())
			throw new Error('You Are Not Authorized');

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
		if (!isAuthenticated())
			throw new Error('You Are Not Authorized');

		const contact: TContactInfo | null =
			await sendRequestToServer(
				`GET`,
				`account/${profileId}/contacts/${contactId}`,
			);
		return contact;
	} catch (e) {
		console.error(e);
	}
};

export const createNewContactInfo = async (
	profileId: string,
	{
		city,
		street,
		contactNumber,
	}: { city: string; street: string; contactNumber: string },
) => {
	try {
		if (!isAuthenticated())
			throw new Error('You Are Not Authorized');

		const contact: TContactInfo | null =
			await sendRequestToServer(
				'POST',
				`account/${profileId}/contacts`,
				{ city, street, contactNumber },
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
		city: string;
		street: string;
		contactNumber: string;
	};
	contactId: string;
	profileId: string;
}) => {
	try {
		if (!isAuthenticated())
			throw new Error('You Are Not Authorized');

		const { city, street, contactNumber } = data;

		const contact: TContactInfo | null =
			await sendRequestToServer(
				'PUT',
				`account/${profileId}/contacts/${contactId}`,
				{ city, street, contactNumber },
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
		if (!isAuthenticated())
			throw new Error('You Are Not Authorized');

		await sendRequestToServer(
			'DELETE',
			`account/${profileId}/contacts/${contactId}`,
		);

		return contactId;
	} catch (e: any) {
		throw new Error(e.message);
	}
};
