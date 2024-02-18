import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { TUser } from '../../app/auth/auth';
import { updateUserPhoneAndUsername } from '../../controllers/profile';
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

	const phoneRef = useRef<HTMLInputElement>(null);
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
					message: 'حقول غير صالحة',
				});
			} else {
				const data = {
					password: passwordRef.current?.value,
					phone: phoneRef.current?.value,
					username: usernameRef.current?.value,
					profileId,
				};
				await updateUserPhoneAndUsername(data),
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
			phoneRef.current?.value === '' ||
			usernameRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'الرجاء قم بإدخال جميع الحقول المطلوبة',
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
			<h3 className='text-muted mb-3'>معلومات الحساب</h3>

			<ErrorComponent error={error} />

			<Form.Group className='mb-3' controlId='phoneInput'>
				<Form.Label> رقم الهاتف</Form.Label>
				<Form.Control
					onChange={handleChange}
					type='text'
					required
					placeholder='name@example.com'
					defaultValue={user?.phone as string}
					ref={phoneRef}
				/>
			</Form.Group>

			<Form.Group className='mb-3' controlId='NameInput'>
				<Form.Label>اسم المستخدم</Form.Label>
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
				<Form.Label>كلمة المرور</Form.Label>
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
					body='حفظ'
					variant='primary'
					isLoading={isLoading}
					disabled={!validated}
				/>
			</Form.Group>
		</Form>
	);
}

export default UpdateUserInfoForm;
