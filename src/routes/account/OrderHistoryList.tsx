/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TOrder } from '../../app/store/order';
import { fetchOrders } from '../../controllers/order';
import { TUser } from '../../app/auth/auth';
import { fetchUser } from '../../controllers/user';
import Widget from '../../components/Widget';
import { Card, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function OrderHistoryList() {
	const { profileId } = useParams();
	const orders: TOrder[] = useAppSelector(
		(state) => state.orders,
	);
	const user: TUser = useAppSelector((state) => state.user);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchUser());
		dispatch(fetchOrders(user?.uid as string));
	}, [dispatch, user?.uid]);

	return (
		<Container>
			{orders?.map((order) => (
				<Widget
					href={`/account/profile/${profileId}/orders-history/${order?.id}`}
					widgetTitle={order?.orderId}
					key={order?.id}
					body={
						<Card.Text className='text-muted'>
							Status:{' '}
							<span
								className={
									order?.status === 'pending'
										? 'text-info'
										: order?.status ===
										  'accepted'
										? 'text-warning'
										: order?.status ===
										  'completed'
										? 'text-success'
										: 'text-danger'
								}
							>
								{order?.status}
							</span>
						</Card.Text>
					}
					height='150px'
				/>
			))}
		</Container>
	);
}

export default OrderHistoryList;
