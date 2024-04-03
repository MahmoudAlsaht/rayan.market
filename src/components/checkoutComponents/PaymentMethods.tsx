/* eslint-disable no-mixed-spaces-and-tabs */
import { LoadingButton } from '@mui/lab';
import {
	Box,
	Breadcrumbs,
	Card,
	CardContent,
	Divider,
	FormControl,
	FormControlLabel,
	IconButton,
	InputBase,
	Paper,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material';
import {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	TCart,
	addPaymentMethodToCart,
	addPromoCodeToCart,
	emptyTheCart,
} from '../../app/store/cart';
import { createAnOrder } from '../../controllers/order';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUser } from '../../controllers/user';
import { TUser } from '../../app/auth/auth';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TPromoCode } from '../../app/store/promo';
import { getPromo } from '../../controllers/promo';

export default function PaymentMethods({
	handleStep,
}: {
	handleStep: (step: string) => void;
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [promo, setPromo] = useState<TPromoCode | null>(null);
	const promoRef = useRef<HTMLInputElement>(null);

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

	const checkPromo = async () => {
		const fetchedPromo: TPromoCode | null = await getPromo({
			promoCode: promoRef.current?.value as string,
		});
		setPromo(fetchedPromo);
		if (!fetchedPromo?.expired)
			dispatch(
				addPromoCodeToCart(fetchedPromo?.code as string),
			);
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

				<Paper
					component='form'
					sx={{
						p: '2px 4px',
						display: 'flex',
						alignItems: 'center',
						width: 300,
						mr: 3,
						mb: 2.5,
					}}
				>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder='ادخل كوبون الخصم'
						inputProps={{
							'aria-label': 'ادخل كوبون الخصم',
						}}
						inputRef={promoRef}
					/>
					<Divider
						sx={{ height: 28, m: 0.5 }}
						orientation='vertical'
					/>
					<IconButton
						type='button'
						sx={{ p: '10px' }}
						aria-label='search'
						onClick={checkPromo}
					>
						<AddCircleOutlineIcon />
					</IconButton>
				</Paper>
				{promo != null ? (
					!promo?.expired ? (
						<Typography
							color='primary'
							sx={{ mb: 2, mr: 2 }}
						>
							لقد تم تأكيد كود الخصم
						</Typography>
					) : (
						<Typography
							color='error'
							sx={{ mb: 2, mr: 2 }}
						>
							الكود المدخل خاطئ أو منتهي الصلاحية
						</Typography>
					)
				) : null}
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
