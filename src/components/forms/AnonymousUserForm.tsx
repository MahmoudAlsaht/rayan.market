import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { LoadingButton } from '@mui/lab';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TAnonymousUser } from '../../app/auth/auth';
import { createAnonymousUser } from '../../controllers/user';
import {
	TCart,
	addAnonymousUserToCart,
	emptyTheCart,
} from '../../app/store/cart';
import { createAnOrder } from '../../controllers/order';
import { useNavigate } from 'react-router-dom';

export default function AnonymousUserForm() {
	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [payButton, setPayButton] = useState(false);
	const [user, setUser] = useState<TAnonymousUser | null>(
		null,
	);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const nameRef = useRef<HTMLInputElement>(null);
	const phoneRef = useRef<HTMLInputElement>(null);
	const cityRef = useRef<HTMLInputElement>(null);
	const streetRef = useRef<HTMLInputElement>(null);
	const cart: TCart | null = useAppSelector(
		(state) => state.cart,
	);

	const handleClick = async () => {
		try {
			setIsLoading(true);
			const data = {
				name: nameRef.current?.value as string,
				phone: phoneRef.current?.value as string,
				city: cityRef.current?.value as string,
				street: streetRef.current?.value as string,
			};
			const createdUser: TAnonymousUser =
				await createAnonymousUser(data);

			setUser(createdUser);

			dispatch(addAnonymousUserToCart(createdUser));

			setIsLoading(false);
			setPayButton(true);
		} catch (e: any) {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			setIsLoading(true);

			dispatch(createAnOrder({ cart, user: user as any }));
			dispatch(emptyTheCart());
			navigate('/home');

			setIsLoading(false);

			nameRef.current!.value = '';
			phoneRef.current!.value = '';
			cityRef.current!.value = '';
			streetRef.current!.value = '';

			setPayButton(false);
		} catch (e: any) {
			setIsLoading(false);
		}
	};

	const handleChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;

		if (
			cityRef.current?.value === '' ||
			nameRef.current?.value === '' ||
			phoneRef.current?.value === '' ||
			streetRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
		} else if (phoneRef.current?.value.length !== 10) {
			setValidated(false);
		} else {
			setValidated(true);
		}
	};

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
							<TextField
								required
								fullWidth
								id='city'
								label='المنطقة'
								name='city'
								type='text'
								autoComplete='city'
								inputRef={cityRef}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id='street'
								label='الشارع'
								name='street'
								type='text'
								autoComplete='street'
								inputRef={streetRef}
								onChange={handleChange}
							/>
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
					{!payButton && (
						<LoadingButton
							fullWidth
							variant='outlined'
							startIcon='حفظ'
							sx={{ mt: 3, mb: 2 }}
							disabled={!validated}
							loading={isLoading}
							onClick={handleClick}
						/>
					)}

					{payButton && (
						<LoadingButton
							type='submit'
							fullWidth
							variant='outlined'
							startIcon='أكمل الطلب'
							sx={{ mb: 2, mt: 2 }}
							disabled={!payButton}
							loading={isLoading}
						/>
					)}
				</Box>
			</Box>
		</Container>
	);
}
