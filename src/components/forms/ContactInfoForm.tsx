import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import {
	TContactInfo,
	createNewContactInfo,
	deleteContact,
	updateUserContactInfo,
} from '../../controllers/contact';
import ErrorComponent, { IError } from '../Error';
import LoadingButton from '../LoadingButton';
import { useParams, useNavigate } from 'react-router-dom';

function ContactInfoForm({
	contact,
}: {
	contact: TContactInfo | null;
}) {
	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isDeleteLoading, setIsDeleteLoading] =
		useState(false);

	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});
	const { profileId } = useParams();
	const navigate = useNavigate();

	const cityRef = useRef<HTMLInputElement>(null);
	const streetRef = useRef<HTMLInputElement>(null);
	const contactNumberRef = useRef<HTMLInputElement>(null);

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
					contactNumber: contactNumberRef.current
						?.value as string,
				};
				if (contact) {
					await updateUserContactInfo({
						data,
						contactId: contact?._id,
						profileId: profileId as string,
					});
				} else {
					await createNewContactInfo(
						profileId as string,
						data,
					);
				}
				setIsLoading(false);
				cityRef.current!.value = '';
				streetRef.current!.value = '';
				contactNumberRef.current!.value = '';
				navigate(-1);
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
			contactNumberRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'الرجاء قم بملئ جميع الحقول',
			});
		} else if (
			contactNumberRef.current?.value.length !== 10
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'رقم الهاتف يجب أن يتكون من 10 أرقام',
			});
		} else {
			setValidated(true);
			setError({
				status: true,
				message: 'looks good!',
			});
		}
	};

	const handleDelete = async () => {
		try {
			setIsDeleteLoading(true);
			await deleteContact(
				profileId as string,
				contact?._id as string,
			);
			setIsDeleteLoading(false);
			navigate(-1);
		} catch (e) {
			setIsDeleteLoading(false);
		}
	};

	return (
		<Container>
			<Form
				noValidate
				validated={!validated}
				onSubmit={handleSubmit}
				style={{ width: '100%' }}
			>
				<h3 className='text-muted text-center mb-3'>
					Contact Info
				</h3>

				<ErrorComponent error={error} />

				<Form.Group
					className='mb-3'
					controlId='cityInput'
				>
					<Form.Label>City</Form.Label>
					<Form.Control
						onChange={handleChange}
						type='text'
						required
						placeholder='Enter City'
						defaultValue={contact?.address.city}
						ref={cityRef}
					/>
				</Form.Group>

				<Form.Group
					className='mb-3'
					controlId='streetInput'
				>
					<Form.Label>Street</Form.Label>
					<Form.Control
						required
						onChange={handleChange}
						type='text'
						placeholder='Enter Street'
						defaultValue={contact?.address.street}
						ref={streetRef}
					/>
				</Form.Group>

				<Form.Group
					className='mb-3'
					controlId='contactNumberInput'
				>
					<Form.Label>Phone Number</Form.Label>
					<Form.Control
						required
						onChange={handleChange}
						type='number'
						placeholder='Enter Your phone Number'
						defaultValue={contact?.contactNumber}
						ref={contactNumberRef}
					/>
				</Form.Group>

				<Form.Group className='mb-3'>
					<LoadingButton
						type='button'
						body='Delete Contact'
						variant='danger'
						className='mb-2'
						isLoading={isDeleteLoading}
						handleClick={handleDelete}
					/>
					<LoadingButton
						type='submit'
						body='Update'
						variant='primary'
						isLoading={isLoading}
						disabled={!validated}
					/>
				</Form.Group>
			</Form>
		</Container>
	);
}

export default ContactInfoForm;
