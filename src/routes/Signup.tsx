import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { TUser } from '../app/auth/auth';
import {
	fetchUser,
	signUpPhone,
	signUpUsernameAndPassword,
} from '../controllers/user';
import ErrorComponent, { IError } from '../components/Error';
import { LoadingButton } from '@mui/lab';
import { checkPhoneValidity } from '../utils';

export type TUserCredentials = {
	userId: string;
	verificationCode: string;
};

export default function SignUp() {
	const [validated, setValidated] = useState(false);
	const [isPhoneValid, setIsPhoneValid] = useState(false);
	const [isVerificationCodeValid, setIsVerificationCodeValid] =
		useState(false);
	const [verificationCode, setVerificationCode] = useState<
		null | string
	>(null);
	const [userId, setUserId] = useState<null | string>(null);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});
	const [isLoading, setIsLoading] = useState(false);

	const phoneRef = useRef<HTMLInputElement | null>(null);
	const verificationCodeRef = useRef<HTMLInputElement | null>(
		null,
	);
	const usernameRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const confirmPasswordRef = useRef<HTMLInputElement | null>(
		null,
	);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	if (user?.username !== 'anonymous') navigate('/home');

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const form = e.currentTarget as HTMLFormElement;

			if (form.checkValidity() === false) {
				setError({
					status: true,
					message: 'حقول غبر صالحة',
				});
			} else {
				setIsLoading(true);
				await signUpUsernameAndPassword(
					userId,
					passwordRef.current!.value,
					usernameRef.current!.value,
					verificationCode,
				);
				navigate('/home');
				setIsLoading(false);
			}
		} catch (e: any) {
			setError({
				status: false,
				message: e.message,
			});
			setIsLoading(false);
		}
	};

	const checkPhonNumber = async (e: FormEvent) => {
		e.preventDefault();
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
			const res: TUserCredentials = await signUpPhone(
				phoneRef.current?.value as string,
			);
			setUserId(res?.userId);
			setVerificationCode(res?.verificationCode);
		}
		setIsLoading(false);
		verificationCodeRef.current!.value = '';
	};

	const checkVerificationCode = (e: FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		if (
			(verificationCodeRef.current?.value as string) !==
			verificationCode
		) {
			setError({
				status: true,
				message: 'رمز التحقق غير صحيح',
			});
		} else {
			setIsVerificationCodeValid(true);
			setError({
				status: false,
				message: 'رقم التحقق صحيح',
			});
		}
		setIsLoading(false);
		verificationCodeRef.current!.value = '';
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

	const handleChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;
		if (
			passwordRef.current?.value === '' ||
			usernameRef.current?.value === '' ||
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
		} else if (usernameRef.current?.value === 'anonymous') {
			setValidated(false);
			setError({
				status: true,
				message: ' لا يمكنك اختيار اسم المستخدم هذا!',
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
					التسجيل
				</Typography>
				<Box sx={{ mt: 3 }}>
					<ErrorComponent error={error} />

					{!isPhoneValid ? (
						<Box
							component='form'
							noValidate
							onSubmit={checkPhonNumber}
							sx={{ mt: 3 }}
						>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id='phone'
									label='رقم الهاتف'
									name='phone'
									type='number'
									autoComplete='phone Number'
									inputRef={phoneRef}
									onChange={handlePhoneChange}
								/>
							</Grid>

							<LoadingButton
								fullWidth
								type='submit'
								sx={{ mt: 1 }}
								variant='outlined'
								startIcon='أرسل رمز التحقق'
								loading={isLoading}
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
									inputRef={
										verificationCodeRef
									}
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
										autoComplete='given-name'
										name='username'
										required
										fullWidth
										id='username'
										label='اسم المستخدم'
										autoFocus
										inputRef={usernameRef}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										name='password'
										label='كلمة المرور'
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
										inputRef={
											confirmPasswordRef
										}
										onChange={handleChange}
									/>
								</Grid>

								{/* <Grid item xs={12}>
									<FormControlLabel
										control={
											<Checkbox
												value='allowExtraEmails'
												color='primary'
											/>
										}
										label='I want to receive inspiration, marketing promotions and updates via email.'
									/>
								</Grid> */}
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

					<Grid
						container
						justifyContent='flex-end'
						sx={{ mt: 3 }}
					>
						<Grid item>
							<Link
								href='/auth/signin'
								variant='body2'
							>
								تملك حساب بالفعل؟ تسجيل الدخول
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
