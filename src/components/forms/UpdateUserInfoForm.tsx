import { FormEvent, useRef, useState } from 'react';
import { TUser } from '../../app/auth/auth';
import { updateUserPhoneAndUsername } from '../../controllers/profile';
import ErrorComponent, { IError } from '../Error';
import { useParams } from 'react-router-dom';
import {
	Box,
	Container,
	FormGroup,
	TextField,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

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

	const phoneRef = useRef<HTMLInputElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			setIsLoading(true);
			const form = e.currentTarget as HTMLFormElement;

			if (form.checkValidity() === false) {
				setError({
					status: true,
					message: 'حقول غير صالحة',
				});
			} else {
				const data = {
					phone: phoneRef.current?.value,
					username: usernameRef.current?.value,
					profileId,
				};
				await updateUserPhoneAndUsername(data),
					setIsLoading(false);
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

	const handleChange = () => {
		if (
			phoneRef.current?.value !== '' &&
			phoneRef.current?.value.length !== 10
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'يجب أن يتكون رقم الهاتف من 10 خانات',
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
		<Container sx={{ m: 5 }}>
			<Box noValidate component='form'>
				<Typography variant='h3'>
					معلومات الحساب
				</Typography>

				<ErrorComponent error={error} />

				<FormGroup sx={{ mb: 5 }}>
					<TextField
						type='text'
						required
						onChange={handleChange}
						label='رقم الهاتف'
						defaultValue={user?.phone as string}
						inputRef={phoneRef}
					/>
				</FormGroup>

				<FormGroup sx={{ mb: 5 }}>
					<TextField
						required
						onChange={handleChange}
						type='text'
						label='اسم المستخدم'
						defaultValue={user?.username as string}
						inputRef={usernameRef}
					/>
				</FormGroup>

				<FormGroup>
					<LoadingButton
						startIcon='حفظ'
						variant='outlined'
						loading={isLoading}
						disabled={!validated}
						onClick={handleSubmit}
					/>
				</FormGroup>
			</Box>
		</Container>
	);
}

export default UpdateUserInfoForm;
