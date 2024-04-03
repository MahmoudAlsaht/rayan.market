/* eslint-disable no-mixed-spaces-and-tabs */
import { LoadingButton } from '@mui/lab';
import {
	Box,
	Breadcrumbs,
	Card,
	CardContent,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material';
import {
	ChangeEvent,
	FormEvent,
	useEffect,
	useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	TCart,
	addPaymentMethodToCart,
	emptyTheCart,
} from '../../app/store/cart';
import { createAnOrder } from '../../controllers/order';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUser } from '../../controllers/user';
import { TUser } from '../../app/auth/auth';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export default function PaymentMethods({
	handleStep,
}: {
	handleStep: (step: string) => void;
}) {
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useAppDispatch();
	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);
	const cart: TCart | null = useAppSelector(
		(state) => state.cart,
	);

	const methods = ['cash', 'credit', 'zainCash'];

	const navigate = useNavigate();

	const [selectPaymentMethod, setSelectedPaymentMethod] =
		useState<string>();

	const checkSelectedMethod = () =>
		selectPaymentMethod != undefined &&
		selectPaymentMethod !== '';

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSelectedPaymentMethod(e.target.value);
		dispatch(addPaymentMethodToCart(e.target.value));
	};

	const handleSubmit = (e: FormEvent<Element> | undefined) => {
		e?.preventDefault();
		try {
			setIsLoading(true);
			dispatch(createAnOrder({ cart, user }));
			dispatch(emptyTheCart());
			navigate('/home');
			setIsLoading(false);
		} catch (e: any) {
			console.log(e.message);
		}
	};

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	return (
		<main dir='rtl'>
			<FormControl
				sx={{
					mt: 20,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Breadcrumbs
					separator={
						<NavigateBeforeIcon fontSize='small' />
					}
					sx={{ my: 5, mt: 20 }}
				>
					<Typography>
						<Link to='/cart'>السلة</Link>
					</Typography>
					<Typography
						sx={{ cursor: 'pointer' }}
						onClick={() => handleStep('information')}
					>
						معلومات الاتصال
					</Typography>
					<Typography
						sx={{
							cursor: 'pointer',
							color: 'primary.main',
						}}
					>
						طرق الدفع
					</Typography>
				</Breadcrumbs>

				<RadioGroup
					aria-labelledby='demo-radio-buttons-group-label'
					name='radio-buttons-group'
				>
					{methods.map((method) => (
						<FormControlLabel
							label={null}
							value={method}
							control={
								<Card
									sx={{
										width: '300px',
										display: 'flex',
										mb: 2,
									}}
									key={method}
								>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											pl: 1,
											pb: 1,
										}}
									>
										<Radio
											name='paymentMethod'
											value={method}
											onChange={
												handleChange
											}
										/>
									</Box>
									<Box
										sx={{
											display: 'flex',
											flexDirection:
												'column',
										}}
									>
										<CardContent
											sx={{
												flex: '1 0 auto',
											}}
										>
											<Typography
												component='div'
												variant='h5'
											>
												{method ===
												'cash'
													? 'الدفع نقدا'
													: method ===
													  'credit'
													? 'دفع بالبطاقة'
													: method ===
															'zainCash' &&
													  'الدفع بواسطة زين كاش'}
											</Typography>
										</CardContent>
									</Box>
								</Card>
							}
						/>
					))}
				</RadioGroup>
				<LoadingButton
					size='large'
					startIcon='أكمل الطلب'
					loading={isLoading}
					onClick={handleSubmit}
					variant='outlined'
					disabled={!checkSelectedMethod()}
				/>
			</FormControl>
		</main>
	);
}
