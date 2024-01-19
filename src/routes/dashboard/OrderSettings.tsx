import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchOrders } from '../../controllers/order';
// import { TUser } from '../../app/auth/auth';
import { TOrder } from '../../app/store/order';
import { Container } from 'react-bootstrap';
import Widget from '../../components/dashboardComponents/Widget';

function OrderSettings() {
	const orders: TOrder[] = useAppSelector(
		(state) => state.orders,
	);
	// const user: TUser = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	useEffect(() => {
		console.log('dispatched');
		dispatch(fetchOrders(''));
	}, [dispatch]);

	return (
		<Container className='m-5'>
			{orders?.map((order) => (
				<Widget
					key={order?.id}
					widgetTitle={order?.id}
					href='#'
				/>
			))}
		</Container>
	);
}

export default OrderSettings;
