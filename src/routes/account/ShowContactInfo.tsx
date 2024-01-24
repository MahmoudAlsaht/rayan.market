import { useParams } from 'react-router-dom';
import ContactInfoForm from '../../components/forms/ContactInfoForm';
import { useEffect, useState } from 'react';
import {
	TContactInfo,
	getContactData,
} from '../../controllers/contact';

function ShowContactInfo() {
	const { contactId } = useParams();
	const [contact, setContact] = useState<TContactInfo | null>(
		null,
	);

	useEffect(() => {
		const getContact = async () => {
			const contactData = await getContactData(
				contactId as string,
			);
			await setContact(contactData);
		};
		getContact();
	}, [contactId]);

	return (
		<div>
			<ContactInfoForm contact={contact} />
		</div>
	);
}

export default ShowContactInfo;
