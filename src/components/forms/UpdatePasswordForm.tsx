import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { updateUserPassword } from '../../controllers/profile';
import ErrorComponent, { IError } from '../Error';
import { useParams } from 'react-router-dom';
import {
	Box,
	FormGroup,
	TextField,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

function UpdatePasswordForm({
	isLoading,
	setIsLoading,
}: {
	isLoading: boolean;
	setIsLoading: (status: boolean) => void;
}) {
	const { profileId } = useParams();
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});

	const passwordRef = useRef<HTMLInputElement>(null);
	const newPasswordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			setIsLoading(true);
			const form = e.currentTarget as HTMLFormElement;

			if (form.checkValidity() === false) {
				setError({
					status: false,
					message: 'حقول غير صالحة',
				});
			} else {
				const data = {
					currentPassword: passwordRef.current?.value,
					newPassword: newPasswordRef.current?.value,
					profileId,
				};
				await updateUserPassword(data);
				setIsLoading(false);

				passwordRef.current!.value = '';
				newPasswordRef.current!.value = '';
				confirmPasswordRef.current!.value = '';
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
			passwordRef.current?.value === '' ||
			newPasswordRef.current?.value === '' ||
			confirmPasswordRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'الرجاء قم بإدخال جميع الحقول المطلوبة',
			});
		} else if (
			newPasswordRef.current!.value.length > 0 &&
			newPasswordRef.current?.value !==
				confirmPasswordRef.current?.value
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'تأكد من تطابق كلمتي المرور',
			});
		} else if (
			newPasswordRef.current!.value.length > 0 &&
			newPasswordRef.current!.value.length < 6
		) {
			setValidated(false);
			setError({
				status: false,
				message:
					'كلمة المرور يجب أن لا تكون اقل من 6 خانات',
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
		<Box
			component='form'
			noValidate
			onSubmit={handleSubmit}
			sx={{ m: 3 }}
		>
			<Typography variant='h3'>
				تعديل كلمة المرور
			</Typography>

			<ErrorComponent error={error} />

			<FormGroup sx={{ mt: 3 }}>
				<TextField
					onChange={handleChange}
					required
					type='password'
					label='كلمة المرور الحالية'
					inputRef={passwordRef}
				/>
			</FormGroup>
			<FormGroup sx={{ mt: 3 }}>
				<TextField
					required
					onChange={handleChange}
					type='password'
					label='كلمة المرور الجديدة'
					inputRef={newPasswordRef}
				/>
			</FormGroup>

			<FormGroup sx={{ mt: 3 }}>
				<TextField
					required
					onChange={handleChange}
					type='password'
					label='تأكيد كلمة المرور'
					inputRef={confirmPasswordRef}
				/>
			</FormGroup>

			<FormGroup sx={{ mt: 3 }}>
				<LoadingButton
					startIcon='حفظ'
					variant='outlined'
					loading={isLoading}
					disabled={!validated}
					onClick={handleSubmit}
				/>
			</FormGroup>
		</Box>
	);
}

export default UpdatePasswordForm;
