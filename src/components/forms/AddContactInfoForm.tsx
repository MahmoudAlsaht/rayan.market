import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { updateUserContactInfo } from '../../controllers/contact';
import ErrorComponent, { IError } from '../Error';
import LoadingButton from '../LoadingButton';
import { DocumentData } from 'firebase/firestore';

function AddContactInfoForm({
	isLoading,
	setIsLoading,
	contact,
}: {
	contact: DocumentData | undefined;
	isLoading: boolean;
	setIsLoading: (status: boolean) => void;
}) {
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});

	const cityRef = useRef<HTMLInputElement>(null);
	const streetRef = useRef<HTMLInputElement>(null);
	const phoneNumberRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			setIsLoading(true);
			const form = e.currentTarget as HTMLFormElement;

			if (form.checkValidity() === false) {
				setError({
					status: true,
					message: 'invalid fields',
				});
			} else {
				const data = {
					city: cityRef.current?.value as string,
					street: streetRef.current?.value as string,
					phoneNumber: phoneNumberRef.current
						?.value as string,
				};
				updateUserContactInfo({
					data,
					contactId: contact?.id,
				});
				setIsLoading(false);
				cityRef.current!.value = '';
				streetRef.current!.value = '';
				phoneNumberRef.current!.value = '';
			}
		} catch (e: any) {
			setError({
				status: true,
				message: e.message,
			});
			setIsLoading(false);
		}
	};

	const handleChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;
		if (
			cityRef.current?.value === '' ||
			streetRef.current?.value === '' ||
			phoneNumberRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'please provide all the missing fields',
			});
		} else {
			setValidated(true);
			setError({
				status: true,
				message: 'looks good!',
			});
		}
	};

	return (
		<Form
			noValidate
			validated={!validated}
			onSubmit={handleSubmit}
			style={{ width: '100%' }}
		>
			<h3 className='text-muted mb-3'>Contact Info</h3>

			<ErrorComponent error={error} />

			<Form.Group className='mb-3' controlId='cityInput'>
				<Form.Label>City</Form.Label>
				<Form.Control
					onChange={handleChange}
					type='text'
					required
					placeholder='Enter City'
					defaultValue={
						contact?.address.city as string
					}
					ref={cityRef}
				/>
			</Form.Group>

			<Form.Group className='mb-3' controlId='streetInput'>
				<Form.Label>Street</Form.Label>
				<Form.Control
					required
					onChange={handleChange}
					type='text'
					placeholder='Enter Street'
					defaultValue={
						contact?.address.street as string
					}
					ref={streetRef}
				/>
			</Form.Group>

			<Form.Group
				className='mb-3'
				controlId='phoneNumberInput'
			>
				<Form.Label>Phone Number</Form.Label>
				<Form.Control
					required
					onChange={handleChange}
					type='text'
					placeholder='Enter Your phone Number'
					defaultValue={contact?.phoneNumber as string}
					ref={phoneNumberRef}
				/>
			</Form.Group>

			<Form.Group className='mb-3'>
				<LoadingButton
					type='submit'
					body='Update'
					variant='primary'
					isLoading={isLoading}
					disabled={!validated}
				/>
			</Form.Group>
		</Form>
	);
}

export default AddContactInfoForm;
