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
import { fetchUser, signUp } from '../controllers/user';
import ErrorComponent, { IError } from '../components/Error';
import { LoadingButton } from '@mui/lab';

export default function SignUp() {
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});
	const [isLoading, setIsLoading] = useState(false);

	const phoneRef = useRef<HTMLInputElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
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
				await signUp(
					phoneRef.current?.value,
					passwordRef.current?.value,
					usernameRef.current!.value,
				);
				navigate(-1);
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

	const handleChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;
		if (
			phoneRef.current?.value === '' ||
			passwordRef.current?.value === '' ||
			usernameRef.current?.value === '' ||
			confirmPasswordRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'الرحاء إدخال جميع الحقول المطلوبة',
			});
		} else if (
			passwordRef.current?.value !==
			confirmPasswordRef.current?.value
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'كلمتي المرور غير متطابقتين',
			});
		} else if (passwordRef.current!.value.length < 6) {
			setValidated(false);
			setError({
				status: false,
				message: 'كلمة المرور يجب أن لا تقل عن 6 خانات',
			});
		} else if (phoneRef.current?.value.length !== 10) {
			setValidated(false);
			setError({
				status: false,
				message: 'رقم الهاتف يجب أن يتكون من 10 أرقام',
			});
		} else if (usernameRef.current?.value === 'anonymous') {
			setValidated(false);
			setError({
				status: false,
				message: ' لا يمكنك اختيار اسم المستخدم هذا!',
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
					Sign up
				</Typography>
				<Box
					component='form'
					noValidate
					onSubmit={handleSubmit}
					sx={{ mt: 3 }}
				>
					<ErrorComponent error={error} />

					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								autoComplete='given-name'
								name='username'
								required
								fullWidth
								id='username'
								label='Username'
								autoFocus
								inputRef={usernameRef}
								onChange={handleChange}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id='phone'
								label='Phone Number'
								name='phone'
								type='number'
								autoComplete='phone Number'
								inputRef={phoneRef}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name='password'
								label='Password'
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
								label='Confirm Password'
								type='password'
								id='passwordConfirmation'
								autoComplete='new-password'
								inputRef={confirmPasswordRef}
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
						type='submit'
						fullWidth
						variant='outlined'
						startIcon='Signup'
						sx={{ mt: 3, mb: 2 }}
						disabled={!validated}
						loading={isLoading}
					/>
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Link
								href='/auth/signin'
								variant='body2'
							>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
