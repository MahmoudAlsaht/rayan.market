import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { TUser } from '../../app/auth/auth';
import { updateUserEmailAndUsername } from '../../controllers/profile';
import ErrorComponent, { IError } from '../Error';
import LoadingButton from '../LoadingButton';
import { useParams } from 'react-router-dom';

function UpdateUserInfoForm({
	user,
	isLoading,
	setIsLoading,
}: {
	user: TUser | null;
	isLoading: boolean;
	setIsLoading: (status: boolean) => void;
}) {
	const { profileId } = useParams();
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
					password: passwordRef.current?.value,
					email: emailRef.current?.value,
					username: usernameRef.current?.value,
					profileId,
				};
				await updateUserEmailAndUsername(data),
					setIsLoading(false);

				passwordRef.current!.value = '';
			}
		} catch (e: any) {
			setValidated(false);
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
					defaultValue={user?.email as string}
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
					defaultValue={user?.username as string}
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
					disabled={!validated}
				/>
			</Form.Group>
		</Form>
	);
}

export default UpdateUserInfoForm;
