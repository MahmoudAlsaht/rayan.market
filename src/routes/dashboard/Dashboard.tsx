/* eslint-disable no-mixed-spaces-and-tabs */
import { Badge, Col, Container, Row } from 'react-bootstrap';
import '../../assets/styles/Dashboard.css';
import Widget from '../../components/Widget';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TUser } from '../../app/auth/auth';
import { memo, useEffect } from 'react';
import { fetchUser } from '../../controllers/user';
import { TOrder } from '../../app/store/order';
import { fetchOrders } from '../../controllers/order';

const Dashboard = memo(() => {
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
		'Banners',
	];

	return (
		<Container className='mt-5'>
			<Row xs={1}>
				{adminWidgets.map((widget, index) => (
					<Col md={6} key={index}>
						<Widget
							widgetTitle={
								widget.toLowerCase() ===
								'settings'
									? 'معلومات الحساب'
									: widget.toLowerCase() ===
									  'orders'
									? 'الطلبات'
									: widget.toLowerCase() ===
									  'categories'
									? 'الأقسام'
									: widget.toLowerCase() ===
									  'products'
									? 'المنتجات'
									: 'اللافتات'
							}
							key={widget}
							href={
								widget.toLowerCase() ===
								'settings'
									? `/account/profile/${
											user && user?.profile
									  }/account-setting`
									: `/dashboard/settings/${widget.toLowerCase()}`
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
});
export default Dashboard;
