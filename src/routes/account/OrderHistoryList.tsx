/* eslint-disable no-mixed-spaces-and-tabs */
import { memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TOrder } from '../../app/store/order';
import { fetchOrders } from '../../controllers/order';
import { TUser } from '../../app/auth/auth';
import { fetchUser } from '../../controllers/user';
import Widget from '../../components/Widget';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';

const OrderHistoryList = memo(() => {
	const { profileId } = useParams();
	const orders: TOrder[] = useAppSelector(
		(state) => state.orders,
	);
	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchUser());
		dispatch(fetchOrders(user?._id as string));
	}, [dispatch, user?._id]);

	return (
		<Container sx={{ m: 3 }}>
			{orders?.map((order) => (
				<Widget
					href={`/account/profile/${profileId}/orders-history/${order?._id}`}
					widgetTitle={
						<Box>
							<Typography variant='h6'>
								{order?.orderId}
							</Typography>
							<Typography
								variant='subtitle1'
								color={
									order?.status === 'pending'
										? 'info.main'
										: order?.status ===
										  'accepted'
										? 'warning.main'
										: order?.status ===
										  'completed'
										? 'primary.main'
										: 'error'
								}
							>
								{order?.status}
							</Typography>
						</Box>
					}
					key={order?._id}
					height='150px'
				/>
			))}
		</Container>
	);
});

export default OrderHistoryList;
