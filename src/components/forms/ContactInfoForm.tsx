import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import {
	TContactInfo,
	createNewContactInfo,
	updateUserContactInfo,
} from '../../controllers/contact';
import ErrorComponent, { IError } from '../Error';
import LoadingButton from '../LoadingButton';
import { useParams, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

function ContactInfoForm({
	contact,
}: {
	contact: TContactInfo | null;
}) {
	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

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
				status: false,
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

	return (
		<Container>
			<main dir='rtl'>
				<Form
					noValidate
					validated={!validated}
					onSubmit={handleSubmit}
					style={{ width: '100%' }}
				>
					<Button
						variant='outline-secondary'
						onClick={() => navigate(-1)}
					>
						<BsArrowLeft /> العودة
					</Button>
					<h3 className='text-muted text-center mb-3'>
						أضف عنوانا
					</h3>

					<ErrorComponent error={error} />

					<Form.Group
						className='mb-3 '
						controlId='cityInput'
					>
						<Form.Label>المنطقة</Form.Label>
						<Form.Control
							onChange={handleChange}
							type='text'
							required
							placeholder='أدخل اسم المنطقة'
							defaultValue={contact?.address.city}
							ref={cityRef}
						/>
					</Form.Group>

					<Form.Group
						className='mb-3 '
						controlId='streetInput'
					>
						<Form.Label>اسم الشارع</Form.Label>
						<Form.Control
							required
							onChange={handleChange}
							type='text'
							placeholder='اسم الشارع'
							defaultValue={
								contact?.address.street
							}
							ref={streetRef}
						/>
					</Form.Group>

					<Form.Group
						className='mb-3 '
						controlId='contactNumberInput'
					>
						<Form.Label>رقم التواصل</Form.Label>
						<Form.Control
							required
							onChange={handleChange}
							type='number'
							placeholder='أدخل رقم للتواصل'
							defaultValue={contact?.contactNumber}
							ref={contactNumberRef}
						/>
					</Form.Group>

					<Form.Group className='mb-3'>
						<LoadingButton
							type='submit'
							body='حفظ'
							variant='primary'
							isLoading={isLoading}
							disabled={!validated}
						/>
					</Form.Group>
				</Form>
			</main>
		</Container>
	);
}

export default ContactInfoForm;
