/* eslint-disable no-mixed-spaces-and-tabs */
import Widget from '../../components/Widget';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TUser } from '../../app/auth/auth';
import { memo, useEffect } from 'react';
import { fetchUser } from '../../controllers/user';
import { TOrder } from '../../app/store/order';
import { fetchOrders } from '../../controllers/order';
import { Badge, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

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
		'Users',
		'Settings',
		'Orders',
		'Categories',
		'Brands',
		'Products',
		'Promos',
		'Banners',
	];

	return (
		<Container sx={{ mt: 5 }}>
			<Grid container>
				{adminWidgets.map((widget, index) => (
					<Grid xs={12} md={6} key={index}>
						<Widget
							widgetTitle={
								widget?.toLowerCase() ===
								'settings' ? (
									'معلومات الحساب'
								) : widget?.toLowerCase() ===
								  'orders' ? (
									<Badge
										badgeContent={
											pendingOrders?.length
										}
										color='primary'
									>
										الطلبات
									</Badge>
								) : widget?.toLowerCase() ===
								  'categories' ? (
									'الأقسام'
								) : widget?.toLowerCase() ===
								  'brands' ? (
									'العلامات التجارية'
								) : widget?.toLowerCase() ===
								  'products' ? (
									'المنتجات'
								) : widget?.toLowerCase() ===
								  'banners' ? (
									'اللافتات'
								) : widget?.toLowerCase() ===
								  'users' ? (
									'المستخدمين'
								) : (
									'كوبونات الخصم'
								)
							}
							key={widget}
							href={
								widget?.toLowerCase() ===
								'settings'
									? `/dashboard/admin/${
											user && user?.profile
									  }/account-settings`
									: `/dashboard/settings/${widget?.toLowerCase()}`
							}
							height='150px'
						/>
					</Grid>
				))}
			</Grid>
		</Container>
	);
});
export default Dashboard;
