/* eslint-disable no-mixed-spaces-and-tabs */
import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	fetchOrder,
	updateOrderStatus,
} from '../../controllers/order';
import { TOrder } from '../../app/store/order';
import { useAppDispatch } from '../../app/hooks';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Container,
	Link,
	Typography,
} from '@mui/material';

const ShowOrderDetails = memo(() => {
	const { orderId } = useParams();
	const dispatch = useAppDispatch();
	const [order, setOrder] = useState<TOrder | null>(null);

	const handleClick = async () => {
		try {
			if (order?.status === 'pending') {
				dispatch(
					updateOrderStatus({
						orderId: order?._id as string,
						updatedStatus: 'canceled',
					}),
				);
				const updatedOrder = await fetchOrder(
					orderId as string,
				);
				setOrder(updatedOrder);
			}
		} catch (e) {
			throw new Error('something went wrong');
		}
	};

	useEffect(() => {
		const getOrder = async () => {
			const fetchedOrder = await fetchOrder(
				orderId as string,
			);
			setOrder(fetchedOrder);
		};

		getOrder();
	}, [orderId, dispatch]);

	return (
		<main dir='rtl'>
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
						<Typography variant='h3'>
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
						<Typography variant='h4'>
							معلومات المشتري
						</Typography>
						<Typography variant='h6'>
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
							<Button
								variant='outlined'
								onClick={handleClick}
								color='error'
								sx={{ mx: { sm: 1 } }}
							>
								إالغاء الطلب
							</Button>
						) : (
							<Button
								disabled
								sx={{
									mx: 1,
								}}
							>
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

export default ShowOrderDetails;
