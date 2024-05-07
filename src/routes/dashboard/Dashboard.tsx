/* eslint-disable no-mixed-spaces-and-tabs */
import Widget from '../../components/Widget';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TUser } from '../../app/auth/auth';
import { memo, useEffect, useState } from 'react';
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

	const [adminWidgets, setAdminWidgets] = useState<string[]>(
		[],
	);

	useEffect(() => {
		dispatch(fetchUser());
		dispatch(fetchOrders(user?._id));
		if (user?.role === 'admin') {
			setAdminWidgets([
				'Users',
				'Settings',
				'Orders',
				'Categories',
				'Brands',
				'Products',
				'Promos',
				'Banners',
				'Districts',
			]);
		} else if (user?.role === 'editor') {
			setAdminWidgets([
				'Settings',
				'Categories',
				'Brands',
				'Products',
				'Promos',
				'Banners',
				'Districts',
			]);
		} else if (user?.role === 'staff') {
			setAdminWidgets(['Settings', 'Orders']);
		}
	}, [dispatch, user?._id, user?.role]);

	return (
		<Container sx={{ mt: 5 }}>
			<Grid container>
				{adminWidgets?.map((widget, index) => (
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
								) : widget?.toLowerCase() ===
								  'promos' ? (
									'كوبونات الخصم'
								) : (
									'المناطق المدعومة'
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
