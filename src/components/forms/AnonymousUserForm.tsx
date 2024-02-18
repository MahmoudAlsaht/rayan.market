import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import ErrorComponent, { IError } from '../Error';
import LoadingButton from '../LoadingButton';
import { DocumentData } from 'firebase/firestore';
import { createAnonymousUser } from '../../controllers/user';
import { addAnonymousUserToCart } from '../../app/store/cart';
import { useAppDispatch } from '../../app/hooks';
import { TAnonymousUser } from '../../app/auth/auth';

function AnonymousUserForm({
	contact,
	handleStep,
}: {
	contact: DocumentData | undefined;
	handleStep: (step: string) => void;
}) {
	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});
	const dispatch = useAppDispatch();

	const nameRef = useRef<HTMLInputElement>(null);
	const phoneRef = useRef<HTMLInputElement>(null);
	const cityRef = useRef<HTMLInputElement>(null);
	const streetRef = useRef<HTMLInputElement>(null);

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
					name: nameRef.current?.value as string,
					phone: phoneRef.current?.value as string,
					city: cityRef.current?.value as string,
					street: streetRef.current?.value as string,
				};

				const user: TAnonymousUser =
					await createAnonymousUser(data);

				dispatch(addAnonymousUserToCart(user));

				setIsLoading(false);
				nameRef.current!.value = '';
				phoneRef.current!.value = '';
				cityRef.current!.value = '';
				streetRef.current!.value = '';
				handleStep('payment');
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
			nameRef.current?.value === '' ||
			phoneRef.current?.value === '' ||
			streetRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'الرجاء قم بملئ جميع الحقول',
			});
		} else if (phoneRef.current?.value.length !== 10) {
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
			<Form
				noValidate
				validated={!validated}
				onSubmit={handleSubmit}
				style={{ width: '100%' }}
			>
				<ErrorComponent error={error} />

				<Row>
					<Col>
						<Form.Group className='mb-3'>
							<Form.Control
								onChange={handleChange}
								type='text'
								required
								placeholder='Name'
								defaultValue={
									contact?.address.city
								}
								ref={nameRef}
							/>
						</Form.Group>
					</Col>
				</Row>
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
					controlId='phoneNumberInput'
				>
					<Form.Label>Phone Number</Form.Label>
					<Form.Control
						required
						onChange={handleChange}
						type='number'
						placeholder='Enter Your phone Number'
						ref={phoneRef}
					/>
				</Form.Group>

				<Form.Group className='mb-3'>
					<LoadingButton
						type='submit'
						body='Proceed to Payment'
						variant='primary'
						isLoading={isLoading}
						disabled={!validated}
					/>
				</Form.Group>
			</Form>
		</Container>
	);
}

export default AnonymousUserForm;
