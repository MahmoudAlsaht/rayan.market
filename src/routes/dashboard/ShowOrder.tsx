/* eslint-disable no-mixed-spaces-and-tabs */
import { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	fetchOrder,
	updateOrderStatus,
} from '../../controllers/order';
import { TOrder } from '../../app/store/order';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TUser } from '../../app/auth/auth';
import { fetchUser } from '../../controllers/user';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Container,
	Link,
	Typography,
} from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const ShowOrder = memo(() => {
	const { orderId } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);

	const [order, setOrder] = useState<TOrder | null>(null);

	const handleClick = async () => {
		try {
			if (order?.status === 'pending') {
				dispatch(
					updateOrderStatus({
						orderId: order?._id as string,
						updatedStatus: 'accepted',
						userId: user?._id as string,
					}),
				);
			} else if (order?.status === 'accepted') {
				dispatch(
					updateOrderStatus({
						orderId: order?._id as string,
						updatedStatus: 'completed',
						userId: user?._id as string,
					}),
				);
			}
			const updatedOrder = await fetchOrder(
				orderId as string,
			);
			setOrder(updatedOrder);
		} catch (e) {
			console.error(e);
		}
	};

	const handleReject = async () => {
		try {
			dispatch(
				updateOrderStatus({
					orderId: order?._id as string,
					updatedStatus: 'rejected',
					userId: user?._id as string,
				}),
			);
			const updatedOrder = await fetchOrder(
				orderId as string,
			);
			setOrder(updatedOrder);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		dispatch(fetchUser());
		const getOrder = async () => {
			const fetchedOrder = await fetchOrder(
				orderId as string,
			);
			setOrder(fetchedOrder);
		};

		getOrder();
	}, [dispatch, orderId]);

	return (
		<main dir='rtl'>
			<Container
				sx={{
					ml: { sm: 5 },
				}}
			>
				<Button
					size='large'
					variant='outlined'
					sx={{
						color: 'secondary.main',
						borderColor: 'secondary.main',
					}}
					onClick={() => navigate(-1)}
				>
					<ArrowRightAltIcon /> العودة
				</Button>
			</Container>

			<Container sx={{ mx: { sm: 5 } }}>
				<Card>
					<CardContent>
						<Typography>
							Order-Id:{' '}
							<span style={{ color: 'gray' }}>
								{order?.orderId}
							</span>
						</Typography>
						<Typography>
							المبلغ الإجمالي:{' '}
							<span style={{ color: 'gray' }}>
								{order?.totalPrice}
							</span>
						</Typography>
						<Typography>
							حالة الطلب:{' '}
							<Typography
								sx={{
									color:
										order?.status ===
										'pending'
											? 'info.main'
											: order?.status ===
											  'accepted'
											? 'warning.main'
											: order?.status ===
											  'completed'
											? 'primary.main'
											: 'error.main',
								}}
							>
								{order?.status}
							</Typography>
						</Typography>
						<Typography>
							طريقة الدفع:{' '}
							<span style={{ color: 'gray' }}>
								{order?.paymentMethod}
							</span>
						</Typography>
						<Typography variant='h5'>
							المنتجات
						</Typography>
						{order?.products?.map((product) => (
							<Typography key={product?._id}>
								<Link
									sx={{
										color: 'info.main',
										cursor: 'pointer',
									}}
									href={`${
										import.meta.env
											.VITE_PRODUCT_REDIRECT_URL
									}${product?._id}`}
									target='_blank'
								>
									{product?.name?.substring(
										0,
										50,
									)}
								</Link>{' '}
								<small>
									X {product?.counter}
								</small>
							</Typography>
						))}
						<Typography variant='h5'>
							معلومات المشتري
						</Typography>
						<Typography variant='h5'>
							<Typography
								sx={{ color: 'secondary' }}
							>
								اسم المستخدم:{' '}
							</Typography>{' '}
							{order?.user?.username}{' '}
						</Typography>
						<Typography variant='h6'>
							<Typography
								sx={{ color: 'secondary' }}
							>
								العنوان:{' '}
							</Typography>{' '}
							{order?.contact?.district?.name}
						</Typography>
						<Typography variant='h6'>
							<Typography
								sx={{ color: 'secondary' }}
							>
								رقم التواصل:{' '}
							</Typography>{' '}
							{order?.contact?.contactNumber}
						</Typography>
					</CardContent>
					<CardActions
						sx={{ mb: { xs: 10, sm: 'unset' } }}
					>
						{order?.status === 'pending' ? (
							<div>
								<Button
									variant='outlined'
									color='error'
									onClick={handleReject}
									sx={{ mx: 1 }}
								>
									رفض
								</Button>
								<Button
									variant='outlined'
									onClick={handleClick}
									color='info'
									sx={{ mx: 1 }}
								>
									الموافقة
								</Button>
							</div>
						) : order?.status === 'accepted' ? (
							<Button
								variant='outlined'
								onClick={handleClick}
								color='info'
								sx={{ mx: 1 }}
							>
								أكتمل الطلب
							</Button>
						) : (
							<Button disabled sx={{ mx: 1 }}>
								This order has been{' '}
								{order?.status}, There are no
								actions to be performed.
							</Button>
						)}
					</CardActions>
				</Card>
			</Container>
		</main>
	);
});

export default ShowOrder;
