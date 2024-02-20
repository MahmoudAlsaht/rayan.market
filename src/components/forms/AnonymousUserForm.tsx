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
						<Form.Group className='mb-3 arb-text'>
							<label htmlFor='name'>
								الاسم الكامل
							</label>
							<Form.Control
								onChange={handleChange}
								type='text'
								required
								itemID='name'
								placeholder='الاسم الكامل'
								defaultValue={
									contact?.address.city
								}
								ref={nameRef}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Form.Group
					className='mb-3 arb-text'
					controlId='cityInput'
				>
					<Form.Label htmlFor='area'>
						المنطقة
					</Form.Label>
					<Form.Control
						onChange={handleChange}
						type='text'
						itemID='area'
						required
						placeholder='أدخل المنطقة'
						defaultValue={contact?.address.city}
						ref={cityRef}
					/>
				</Form.Group>

				<Form.Group
					className='mb-3 arb-text'
					controlId='streetInput'
				>
					<Form.Label htmlFor='street'>
						اسم الشارع
					</Form.Label>
					<Form.Control
						required
						onChange={handleChange}
						type='text'
						itemID='street'
						placeholder='ادخل اسم الشارع'
						defaultValue={contact?.address.street}
						ref={streetRef}
					/>
				</Form.Group>

				<Form.Group
					className='mb-3 arb-text'
					controlId='phoneNumberInput'
				>
					<Form.Label htmlFor='phoneNumber'>
						رقم التواصل
					</Form.Label>
					<Form.Control
						required
						itemID='phoneNumber'
						onChange={handleChange}
						type='number'
						placeholder='رقم التواصل'
						ref={phoneRef}
					/>
				</Form.Group>

				<Form.Group className='mb-3'>
					<LoadingButton
						type='submit'
						body='أكمل للدفع'
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
