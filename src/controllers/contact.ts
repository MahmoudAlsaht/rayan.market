import { arrayUnion } from 'firebase/firestore';
import addData from '../firebase/firestore/addData';
import getData from '../firebase/firestore/getData';
import updateDocs from '../firebase/firestore/updateDoc';
// import { TProfile } from '../app/auth/profile';
import destroyDoc from '../firebase/firestore/deleteDoc';
import { isAuthenticated } from '../utils';

export type Address = {
	city: string;
	street: string;
};

export type TContactInfo = {
	id: string;
	address: Address;
	phoneNumber: string;
	productId: string;
};

export const getContactsData = async (profileId: string) => {
	try {
		if (!isAuthenticated())
			throw new Error('You Are Not Authorized');

		const profile = await getData(
			'profiles',
			'id',
			profileId,
		);
		const contactsIds = profile?.data?.contacts;
		const contacts = [];

		if (profile?.data?.contacts)
			for (const id of contactsIds) {
				const contactInfo = await getData(
					'contacts',
					'id',
					id,
				);
				contacts.push(contactInfo?.data);
			}

		return contacts as any;
	} catch (e: any) {
		console.error(e.message);
		throw new Error(e.message);
	}
};

export const getContactData = async (contactId: string) => {
	try {
		if (!isAuthenticated())
			throw new Error('You Are Not Authorized');

		const contact = await getData(
			'contacts',
			'id',
			contactId,
		);
		return contact?.data as any;
	} catch (e) {
		console.error(e);
	}
};

export const createNewContactInfo = async (
	profileId: string,
	{
		city,
		street,
		phoneNumber,
	}: { city: string; street: string; phoneNumber: string },
) => {
	try {
		if (!isAuthenticated())
			throw new Error('You Are Not Authorized');

		const contactInfo = await addData('contacts', {
			address: { city, street },
			phoneNumber,
			profileId,
		});
		await updateDocs('contacts', contactInfo?.id, {
			id: contactInfo?.id,
		});
		const profile = await getData(
			'profiles',
			'id',
			profileId,
		);
		await updateDocs('profiles', profile?.docId as string, {
			contacts: arrayUnion(contactInfo?.id),
		});
	} catch (e: any) {
		console.error(e.message);
		throw new Error(e.message);
	}
};

export const updateUserContactInfo = async ({
	data,
	contactId,
}: {
	data: { city: string; street: string; phoneNumber: string };
	contactId: string;
}) => {
	try {
		if (!isAuthenticated())
			throw new Error('You Are Not Authorized');

		const { city, street, phoneNumber } = data;
		await updateDocs('contacts', contactId, {
			address: { city, street },
			phoneNumber,
		});

		return {
			address: {
				city,
				street,
			},
			phoneNumber,
		};
	} catch (e: any) {
		throw new Error(
			'Something went wrong, Please check your credential and try again later.',
		);
	}
};

export const deleteContact = async (
	profileId: string,
	contactId: string,
) => {
	try {
		if (!isAuthenticated())
			throw new Error('You Are Not Authorized');

		// const { data, docId } = (await getData(
		// 	'profiles',
		// 	'id',
		// 	profileId,
		// )) as { data: TProfile; docId: string };
		// const profileContacts = data?.contacts.filter(
		// 	(contact) => contact !== contactId,
		// );
		// await updateDocs('profiles', docId, {
		// 	contacts: profileContacts,
		// });
		await destroyDoc('contacts', contactId);
		return contactId;
	} catch (e: any) {
		console.error(e);
		// throw new Error('Cannot delete contact');
	}
};
