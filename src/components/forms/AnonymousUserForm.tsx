import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import ErrorComponent, { IError } from '../Error';
import LoadingButton from '../LoadingButton';
import { DocumentData } from 'firebase/firestore';
import { createAnonymousUser } from '../../controllers/user';
import { addAnonymousUserToCart } from '../../app/store/cart';
import { useAppDispatch } from '../../app/hooks';

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

	const firstNameRef = useRef<HTMLInputElement>(null);
	const lastNameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
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
					firstName: firstNameRef.current
						?.value as string,
					lastName: lastNameRef.current
						?.value as string,
					email: emailRef.current?.value as string,
					city: cityRef.current?.value as string,
					street: streetRef.current?.value as string,
					phoneNumber: phoneNumberRef.current
						?.value as string,
				};

				const userId = await createAnonymousUser(data);

				dispatch(addAnonymousUserToCart(userId));

				setIsLoading(false);
				firstNameRef.current!.value = '';
				lastNameRef.current!.value = '';
				emailRef.current!.value = '';
				cityRef.current!.value = '';
				streetRef.current!.value = '';
				phoneNumberRef.current!.value = '';
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
			firstNameRef.current?.value === '' ||
			lastNameRef.current?.value === '' ||
			emailRef.current?.value === '' ||
			streetRef.current?.value === '' ||
			phoneNumberRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'please provide all the missing fields',
			});
		} else if (phoneNumberRef.current?.value.length !== 10) {
			setValidated(false);
			setError({
				status: false,
				message: 'phone number must be 10 characters',
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
								placeholder='First Name'
								defaultValue={
									contact?.address.city
								}
								ref={firstNameRef}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Control
								className='mb-3'
								onChange={handleChange}
								type='text'
								required
								placeholder='Last Name'
								defaultValue={
									contact?.address.city
								}
								ref={lastNameRef}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control
						className='mb-3'
						onChange={handleChange}
						type='email'
						required
						placeholder='Email Address'
						defaultValue={contact?.address.city}
						ref={emailRef}
					/>
				</Form.Group>
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
						defaultValue={contact?.phoneNumber}
						ref={phoneNumberRef}
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
