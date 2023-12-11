import { arrayUnion } from 'firebase/firestore';
import addData from '../firebase/firestore/addData';
import getData from '../firebase/firestore/getData';
import updateDocs from '../firebase/firestore/updateDoc';

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
	const profile = await getData('profiles', 'id', profileId);
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

	return contacts;
};

export const getContactData = async (contactId: string) => {
	const contact = await getData('contacts', 'id', contactId);
	return contact?.data;
};

export const createNewContactInfo = async (
	profileId: string,
	{
		city,
		street,
		phoneNumber,
	}: { city: string; street: string; phoneNumber: string },
) => {
	const contactInfo = await addData('contacts', {
		address: { city, street },
		phoneNumber,
		profileId,
	});
	await updateDocs('contacts', contactInfo?.id, {
		id: contactInfo?.id,
	});
	const profile = await getData('profiles', 'id', profileId);
	await updateDocs('profiles', profile?.docId as string, {
		contacts: arrayUnion(contactInfo?.id),
	});
};

export const updateUserContactInfo = async ({
	data,
	contactId,
}: {
	data: { city: string; street: string; phoneNumber: string };
	contactId: string;
}) => {
	try {
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
