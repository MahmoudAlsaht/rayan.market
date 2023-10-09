import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { editProfile } from '../controllers/profile';
import { IUser } from '../controllers/user';
import ErrorComponent, { IError } from './Error';

function UpdatePasswordForm({
	profileOwner,
}: {
	profileOwner: IUser;
}) {
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: 'please provide all the fields below',
	});

	const passwordRef = useRef<HTMLInputElement>(null);
	const newPasswordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const form = e.currentTarget as HTMLFormElement;

			if (form.checkValidity() === false) {
				setError({
					status: true,
					message: 'invalid fields',
				});
			} else {
				const data = {
					currentPassword: passwordRef.current?.value,
					newPassword: newPasswordRef.current?.value,
				};
				await editProfile(data, profileOwner?.docId);
			}
		} catch (e: any) {
			console.log(e.message);
			setError({
				status: true,
				message:
					'Something went wrong, please try again',
			});
		}
	};

	const handleChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;
		if (
			passwordRef.current?.value === '' ||
			newPasswordRef.current?.value === '' ||
			confirmPasswordRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'please provide all the missing fields',
			});
		} else if (
			newPasswordRef.current!.value.length > 0 &&
			newPasswordRef.current?.value !==
				confirmPasswordRef.current?.value
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'passwords do not match',
			});
		} else if (
			newPasswordRef.current!.value.length > 0 &&
			newPasswordRef.current!.value.length < 6
		) {
			setValidated(false);
			setError({
				status: false,
				message:
					'password must be at least 6 characters',
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
			className='mt-5'
		>
			<h3 className='text-muted mb-3'>Update Password</h3>

			<ErrorComponent error={error} />

			<Form.Group
				className='mb-3'
				controlId='CurrentPasswordInput'
			>
				<Form.Label>Current Password</Form.Label>
				<Form.Control
					onChange={handleChange}
					required
					type='password'
					placeholder='at least 6 char'
					ref={passwordRef}
				/>
			</Form.Group>
			<Form.Group
				className='mb-3'
				controlId='NewPasswordInput'
			>
				<Form.Label>New Password</Form.Label>
				<Form.Control
					required
					onChange={handleChange}
					type='password'
					placeholder='at least 6 char'
					ref={newPasswordRef}
				/>
			</Form.Group>
			<Form.Group
				className='mb-3'
				controlId='passwordConfirmationInput'
			>
				<Form.Label>Confirm Password</Form.Label>
				<Form.Control
					required
					onChange={handleChange}
					type='password'
					placeholder='at least 6 char'
					ref={confirmPasswordRef}
				/>
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Control
					disabled={!validated}
					type='submit'
					value='Save'
					className={`btn ${
						!validated
							? 'btn-secondary'
							: 'btn-outline-warning'
					}`}
				/>
			</Form.Group>
		</Form>
	);
}

export default UpdatePasswordForm;
