import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { IUser } from '../../app/auth/auth';
import { updateUserEmailAndUsername } from '../../controllers/profile';
import { useAppDispatch } from '../../app/hooks';
import ErrorComponent, { IError } from '../Error';
import LoadingButton from '../LoadingButton';

function UpdateUserInfoForm({
	profileOwner,
	isLoading,
	setIsLoading,
}: {
	profileOwner: IUser;
	isLoading: boolean;
	setIsLoading: (status: boolean) => void;
}) {
	const dispatch = useAppDispatch();
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});

	const emailRef = useRef<HTMLInputElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

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
					currentPassword: passwordRef.current?.value,
					email: emailRef.current?.value,
					username: usernameRef.current?.value,
				};
				await dispatch(
					updateUserEmailAndUsername({
						data,
						docId: profileOwner?.docId,
					}),
				);
				setIsLoading(false);
				emailRef.current!.value = '';
				usernameRef.current!.value = '';
				passwordRef.current!.value = '';
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
			passwordRef.current?.value === '' ||
			emailRef.current?.value === '' ||
			usernameRef.current?.value === '' ||
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
			<h3 className='text-muted mb-3'>Personal Info</h3>

			<ErrorComponent error={error} />

			<Form.Group className='mb-3' controlId='emailInput'>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					onChange={handleChange}
					type='email'
					required
					placeholder='name@example.com'
					defaultValue={profileOwner?.email as string}
					ref={emailRef}
				/>
			</Form.Group>

			<Form.Group className='mb-3' controlId='NameInput'>
				<Form.Label>username</Form.Label>
				<Form.Control
					required
					onChange={handleChange}
					type='text'
					placeholder='your name'
					defaultValue={
						profileOwner?.username as string
					}
					ref={usernameRef}
				/>
			</Form.Group>
			<Form.Group
				className='mb-3'
				controlId='passwordUserInfoFormInput'
			>
				<Form.Label>Password</Form.Label>
				<Form.Control
					required
					onChange={handleChange}
					type='password'
					placeholder='at least 6 char'
					ref={passwordRef}
				/>
			</Form.Group>
			<Form.Group className='mb-3'>
				<LoadingButton
					type='submit'
					body='Update'
					variant='primary'
					isLoading={isLoading}
				/>
			</Form.Group>
		</Form>
	);
}

export default UpdateUserInfoForm;
