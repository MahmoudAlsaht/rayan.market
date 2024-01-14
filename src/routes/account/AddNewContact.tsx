import { useState } from 'react';
import ContactInfoForm from '../../components/forms/ContactInfoForm';

function AddNewContact() {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div>
			<ContactInfoForm
				isLoading={isLoading}
				setIsLoading={setIsLoading}
				contact={undefined}
			/>
		</div>
	);
}

export default AddNewContact;
