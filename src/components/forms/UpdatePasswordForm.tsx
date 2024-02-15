import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { updateUserPassword } from '../../controllers/profile';
import ErrorComponent, { IError } from '../Error';
import LoadingButton from '../LoadingButton';
import { useParams } from 'react-router-dom';

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
		<Form
			noValidate
			validated={!validated}
			onSubmit={handleSubmit}
			style={{ width: '100%' }}
			className='mt-5'
		>
			<h3 className='text-muted mb-3'>
				تحديث كلمة المرور
			</h3>

			<ErrorComponent error={error} />

			<Form.Group
				className='mb-3'
				controlId='CurrentPasswordInput'
			>
				<Form.Label>كلمة المرور الحالية</Form.Label>
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
				<Form.Label>كلمة المرور الجديدة</Form.Label>
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
				<Form.Label>تأكيد كلمة المرور</Form.Label>
				<Form.Control
					required
					onChange={handleChange}
					type='password'
					placeholder='at least 6 char'
					ref={confirmPasswordRef}
				/>
			</Form.Group>
			<Form.Group className='mb-3'>
				<LoadingButton
					type='submit'
					body='Save'
					variant='primary'
					isLoading={isLoading}
					disabled={!validated}
				/>
			</Form.Group>
		</Form>
	);
}

export default UpdatePasswordForm;
