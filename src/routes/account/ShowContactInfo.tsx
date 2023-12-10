import { useParams } from 'react-router-dom';
import AddContactInfoForm from '../../components/forms/AddContactInfoForm';
import { useEffect, useState } from 'react';
import { getContactData } from '../../controllers/contact';
import { DocumentData } from 'firebase/firestore';

function ShowContactInfo() {
	const { contactId } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [contact, setContact] = useState<
		DocumentData | undefined
	>();

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
			<AddContactInfoForm
				isLoading={isLoading}
				setIsLoading={setIsLoading}
				contact={contact}
			/>
		</div>
	);
}

export default ShowContactInfo;
