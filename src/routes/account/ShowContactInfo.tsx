import { useParams } from 'react-router-dom';
import ContactInfoForm from '../../components/forms/ContactInfoForm';
import { useEffect, useState } from 'react';
import {
	TContactInfo,
	getContactData,
} from '../../controllers/contact';

function ShowContactInfo() {
	const { profileId, contactId } = useParams();
	const [contact, setContact] =
		useState<TContactInfo | null>();

	useEffect(() => {
		const getContact = async () => {
			const contactData = await getContactData(
				profileId as string,
				contactId as string,
			);
			await setContact(contactData);
		};
		getContact();
	}, [contactId, profileId]);

	return (
		<div>
			<ContactInfoForm contact={contact!} />
		</div>
	);
}

export default ShowContactInfo;
