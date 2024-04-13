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
import { createAnonymousUser } from '../../controllers/user';
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

	const dispatch = useAppDispatch();

	const nameRef = useRef<HTMLInputElement>(null);
	const phoneRef = useRef<HTMLInputElement>(null);
	const [districtValue, setDistrictValue] = useState('');

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			setIsLoading(true);

			const data = {
				name: nameRef.current?.value as string,
				phone: phoneRef.current?.value as string,
				districtId: districtValue,
			};
			const createdUser: TAnonymousUser =
				await createAnonymousUser(data);

			dispatch(addAnonymousUserToCart(createdUser));

			nameRef.current!.value = '';
			phoneRef.current!.value = '';
			setDistrictValue('');
			setIsLoading(false);
			handleStep('payment');
		} catch (e: any) {
			setIsLoading(false);
		}
	};

	const handleChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;

		if (
			districtValue === '' ||
			nameRef.current?.value === '' ||
			phoneRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
		} else if (phoneRef.current?.value.length !== 10) {
			setValidated(false);
		} else {
			setValidated(true);
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
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Box
					component='form'
					noValidate
					onSubmit={handleSubmit}
				>
					<Grid container spacing={2}>
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
												{district?.name}
											</MenuItem>
										),
									)}
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id='phone'
								label='رقم التواصل'
								name='phone'
								type='number'
								autoComplete='phone'
								inputRef={phoneRef}
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
			</Box>
		</Container>
	);
}
