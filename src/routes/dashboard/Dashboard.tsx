import { Badge, Col, Container, Row } from 'react-bootstrap';
import '../../assets/styles/Dashboard.css';
import Widget from '../../components/Widget';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TUser } from '../../app/auth/auth';
import { useEffect } from 'react';
import { fetchUser } from '../../controllers/user';
import { TOrder } from '../../app/store/order';
import { fetchOrders } from '../../controllers/order';

function Dashboard() {
	const dispatch = useAppDispatch();

	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);

	const orders: TOrder[] = useAppSelector(
		(state) => state.orders,
	);

	const pendingOrders: TOrder[] = orders?.filter((order) => {
		return order.status === 'pending';
	});

	useEffect(() => {
		dispatch(fetchUser());
		dispatch(fetchOrders(''));
	}, [dispatch]);

	const adminWidgets = [
		'Settings',
		'Orders',
		'Categories',
		'Products',
	];

	return (
		<Container className='mt-5'>
			<Row xs={1}>
				{adminWidgets.map((widget, index) => (
					<Col md={6} key={index}>
						<Widget
							widgetTitle={widget}
							key={widget}
							href={
								widget === 'settings'
									? `/account/profile/${user?.profile}/account-setting`
									: `/dashboard/settings/${widget.toLocaleLowerCase()}`
							}
							badge={
								pendingOrders.length > 0 &&
								widget === 'Orders' && (
									<Badge pill bg='danger'>
										{pendingOrders?.length}
									</Badge>
								)
							}
						/>
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default Dashboard;
