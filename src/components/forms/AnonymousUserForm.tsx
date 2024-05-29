import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { LoadingButton } from '@mui/lab';
import {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useAppDispatch } from '../../app/hooks';
import { TAnonymousUser } from '../../app/auth/auth';
import {
	createAnonymousUser,
	verifyAnonymousUserPhone,
} from '../../controllers/user';
import { addAnonymousUserToCart } from '../../app/store/cart';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';
import {
	TDistrict,
	fetchDistricts,
} from '../../controllers/district';
import ErrorComponent, { IError } from '../Error';
import { TUserCredentials } from '../../routes/Signup';
import { checkPhoneValidity } from '../../utils';

export default function AnonymousUserForm({
	handleStep,
}: {
	handleStep: (step: string) => void;
}) {
	const [districts, setDistricts] = useState<
		(TDistrict | null)[]
	>([]);

	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});

	const [isPhoneValid, setIsPhoneValid] = useState(false);
	const [isVerificationCodeValid, setIsVerificationCodeValid] =
		useState(false);
	const [verificationCode, setVerificationCode] = useState<
		null | string
	>(null);
	const [userId, setUserId] = useState<null | string>(null);

	const dispatch = useAppDispatch();

	const phoneRef = useRef<HTMLInputElement | null>(null);
	const verificationCodeRef = useRef<HTMLInputElement | null>(
		null,
	);
	const nameRef = useRef<HTMLInputElement>(null);
	const [districtValue, setDistrictValue] = useState('');

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
			const res: TUserCredentials =
				await verifyAnonymousUserPhone({
					phone: phoneRef.current?.value as string,
				});
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

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			setIsLoading(true);

			const data = {
				name: nameRef.current?.value as string,
				userId,
				verificationCode,
				districtId: districtValue,
			};
			const createdUser: TAnonymousUser =
				await createAnonymousUser(data);

			dispatch(addAnonymousUserToCart(createdUser));

			setDistrictValue('');
			setIsLoading(false);
			handleStep('payment');
			nameRef.current!.value = '';
			phoneRef.current!.value = '';
		} catch (e: any) {
			setIsLoading(false);
		}
	};

	const handleChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;

		if (
			districtValue === '' ||
			nameRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: true,
				message: 'الرحاء إدخال جميع الحقول المطلوبة',
			});
		} else {
			setValidated(true);
			setValidated(true);
			setError({
				status: false,
				message: 'looks good!',
			});
		}
	};

	useEffect(() => {
		const getDistricts = async () => {
			const fetchedDistricts = await fetchDistricts();
			setDistricts(fetchedDistricts);
		};
		getDistricts();
	}, []);

	return (
		<Container
			component='main'
			maxWidth='xs'
			sx={{ mb: 10 }}
		>
			<CssBaseline />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
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
								defaultValue={''}
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
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<FormControl fullWidth>
									<InputLabel id='selectCategory'>
										المنطقة
									</InputLabel>
									<Select
										labelId='selectCategory'
										id='category-select'
										value={districtValue}
										onChange={(
											e: SelectChangeEvent,
										) => {
											setDistrictValue(
												e.target
													.value as string,
											);
										}}
										label='اختر المنطقة'
									>
										<MenuItem value=''>
											<em>اختر المنطقة</em>
										</MenuItem>
										{districts?.map(
											(district) => (
												<MenuItem
													value={
														district?._id
													}
													key={
														district?._id
													}
												>
													{
														district?.name
													}
												</MenuItem>
											),
										)}
									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={12}>
								<TextField
									autoComplete='given-name'
									name='username'
									required
									fullWidth
									id='username'
									label='الاسم'
									autoFocus
									inputRef={nameRef}
									onChange={handleChange}
								/>
							</Grid>
						</Grid>
						<LoadingButton
							fullWidth
							variant='outlined'
							startIcon='حفظ'
							type='submit'
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
