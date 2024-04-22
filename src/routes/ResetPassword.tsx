import ErrorComponent, { IError } from '../components/Error';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	check6DigitCode,
	requestVerificationCode,
	updatePassword,
} from '../controllers/user';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
	Avatar,
	Box,
	Container,
	CssBaseline,
	Grid,
	TextField,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { checkPhoneValidity } from '../utils';

function ResetPassword() {
	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isPhoneValid, setIsPhoneValid] = useState(false);
	const [user, setUser] = useState<null | string>(null);
	const [isVerificationCodeValid, setIsVerificationCodeValid] =
		useState(false);

	const verificationCodeRef = useRef<HTMLInputElement | null>(
		null,
	);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const confirmPasswordRef = useRef<HTMLInputElement | null>(
		null,
	);

	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});

	const phoneRef = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();

	const checkPhonNumber = async (e: FormEvent) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const validity = await checkPhoneValidity(
				phoneRef.current?.value as string,
			);
			setIsPhoneValid(validity as boolean);
			if (!validity) {
				setError({
					status: true,
					message: 'رقم الهاتف غير صحيح',
				});
				setIsLoading(false);
			} else {
				setError({
					status: false,
					message: 'رقم الهاتف صحيح',
				});
				const userId = await requestVerificationCode(
					phoneRef.current?.value as string,
				);
				setUser(userId);
				if (phoneRef.current)
					phoneRef.current.value = '';
				setIsLoading(false);
			}
		} catch (e: any) {
			setError({
				status: true,
				message: e.message,
			});
			setIsLoading(false);
		}
	};

	const checkVerificationCode = async (e: FormEvent) => {
		try {
			e.preventDefault();
			setIsVerificationCodeValid(true);
			await check6DigitCode({
				verificationCode: verificationCodeRef.current
					?.value as string,
				user: user as string,
			});
			if (verificationCodeRef.current)
				verificationCodeRef.current.value = '';
		} catch (e: any) {
			setIsVerificationCodeValid(false);
			setError({
				status: true,
				message: e.message,
			});
			setIsLoading(false);
		}
	};

	const handlePhoneChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;
		if (
			phoneRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: true,
				message: 'الرحاء إدخال جميع الحقول المطلوبة',
			});
		} else if (phoneRef.current?.value.length !== 10) {
			setValidated(false);
			setError({
				status: true,
				message: 'رقم الهاتف يجب أن يتكون من 10 أرقام',
			});
		} else {
			setValidated(true);
			setError({
				status: false,
				message: 'looks good!',
			});
		}
	};

	const handleVerificationCodeChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;
		if (
			verificationCodeRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: true,
				message: 'الرحاء إدخال جميع الحقول المطلوبة',
			});
		} else if (
			verificationCodeRef.current?.value.length !== 6
		) {
			setValidated(false);
			setError({
				status: true,
				message: 'ادخل 6 أرقام',
			});
		} else {
			setValidated(true);
			setError({
				status: false,
				message: 'looks good!',
			});
		}
	};

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
				await updatePassword({
					password: passwordRef.current
						?.value as string,
					passwordConfirmation: confirmPasswordRef
						.current?.value as string,
					user: user as string,
				});
				navigate('/home');
			}
		} catch (e: any) {
			setError({
				status: false,
				message: e.message,
			});
		}
	};

	const handleChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;
		if (
			passwordRef.current?.value === '' ||
			confirmPasswordRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: true,
				message: 'الرحاء إدخال جميع الحقول المطلوبة',
			});
		} else if (
			passwordRef.current?.value !==
			confirmPasswordRef.current?.value
		) {
			setValidated(false);
			setError({
				status: true,
				message: 'كلمتي المرور غير متطابقتين',
			});
		} else if (passwordRef.current!.value.length < 6) {
			setValidated(false);
			setError({
				status: true,
				message: 'كلمة المرور يجب أن لا تقل عن 6 خانات',
			});
		} else {
			setValidated(true);
			setError({
				status: false,
				message: 'looks good!',
			});
		}
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					أعادة ضبط كلمة المرور{' '}
				</Typography>

				<ErrorComponent error={error} />

				{!isPhoneValid ? (
					<Box
						component='form'
						onSubmit={checkPhonNumber}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin='normal'
							required
							fullWidth
							id='phone'
							label='رقم الهاتف'
							name='phone'
							autoComplete='phone number'
							type='number'
							autoFocus
							inputRef={phoneRef}
							onChange={handlePhoneChange}
						/>

						<LoadingButton
							type='submit'
							fullWidth
							variant='outlined'
							startIcon='إعادة ضبط'
							loading={isLoading}
							disabled={!validated}
							sx={{ mt: 3, mb: 2 }}
						/>
					</Box>
				) : !isVerificationCodeValid ? (
					<Box
						component='form'
						noValidate
						onSubmit={checkVerificationCode}
						sx={{ mt: 3 }}
					>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id='verificationCode'
								label='رمز التحقق'
								name='verificationCode'
								type='number'
								autoComplete='verificationCode Number'
								inputRef={verificationCodeRef}
								onChange={
									handleVerificationCodeChange
								}
							/>
						</Grid>

						<LoadingButton
							type='submit'
							fullWidth
							sx={{ mt: 1 }}
							variant='outlined'
							startIcon='تحقق من الرمز'
							loading={isLoading}
						/>
					</Box>
				) : (
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name='password'
									label='كلمة المرور الجديدة'
									type='password'
									id='password'
									autoComplete='new-password'
									inputRef={passwordRef}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name='passwordConfirmation'
									label='تأكيد كلمة المرور'
									type='password'
									id='passwordConfirmation'
									autoComplete='new-password'
									inputRef={confirmPasswordRef}
									onChange={handleChange}
								/>
							</Grid>
						</Grid>

						<LoadingButton
							type={
								isVerificationCodeValid
									? 'submit'
									: 'button'
							}
							fullWidth
							variant='outlined'
							startIcon='التسجيل'
							sx={{ mt: 3, mb: 2 }}
							disabled={!validated}
							loading={isLoading}
						/>
					</Box>
				)}
			</Box>
		</Container>
	);
}

export default ResetPassword;
