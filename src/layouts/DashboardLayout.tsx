/* eslint-disable no-mixed-spaces-and-tabs */
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {
	AppBarProps as MuiAppBarProps,
} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';

import DiscountIcon from '@mui/icons-material/Discount';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CategoryIcon from '@mui/icons-material/Category';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { TUser } from '../app/auth/auth';
import { TOrder } from '../app/store/order';
import { fetchUser, logout } from '../controllers/user';
import { fetchOrders } from '../controllers/order';
import { Badge } from '@mui/material';
import { useEffect, useState } from 'react';
import MobileNavigation from '../components/mobileComponents/MobileNavigation';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(
			['width', 'margin'],
			{
				easing: theme.transitions.easing.sharp,
				duration:
					theme.transitions.duration.enteringScreen,
			},
		),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

export default function DashBoardLayout() {
	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const user: TUser | any = useAppSelector(
		(state) => state.user,
	);

	const orders: TOrder[] = useAppSelector(
		(state) => state.orders,
	);

	const ifNotDashboardHomePage =
		window.location.pathname.includes('settings');

	if (user?.role === 'customer') navigate('/home');

	useEffect(() => {
		dispatch(fetchUser());
		dispatch(fetchOrders(user?._id));
	}, [dispatch, user?._id]);

	const pendingOrders: TOrder[] = orders?.filter((order) => {
		return order.status === 'pending';
	});

	const handleLogout = async () => {
		await dispatch(logout());
		dispatch(fetchUser());
		navigate('/home');
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Box sx={{ display: { sm: 'none' } }}>
				<MobileNavigation />
			</Box>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar
					dir='rtl'
					open={open}
					sx={{
						bgcolor: 'white',
						color: 'primary.main',
					}}
				>
					<Toolbar>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							edge='start'
							sx={{
								marginRight: 5,
								display: {
									xs: 'none',
									sm: 'block',
								},
								...(open && { display: 'none' }),
							}}
						>
							<MenuIcon />
						</IconButton>

						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={() => navigate(-1)}
							edge='start'
							sx={{
								marginRight: 5,
								display: {
									xs: 'block',
									sm: 'none',
								},
							}}
						>
							<ArrowForwardIosIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Drawer
					variant='permanent'
					open={open}
					sx={{ display: { xs: 'none', sm: 'block' } }}
				>
					<DrawerHeader>
						<IconButton
							onClick={handleDrawerClose}
							sx={{
								display: {
									xs: 'none',
									sm: 'block',
								},
							}}
						>
							<ChevronRightIcon />
						</IconButton>
					</DrawerHeader>
					<Divider />
					<List>
						<Link to={`/home`}>
							<ListItem
								disablePadding
								sx={{
									display: 'block',
									color: 'primary.main',
								}}
							>
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open
											? 'initial'
											: 'center',
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open
												? 3
												: 'auto',
											justifyContent:
												'center',
										}}
									>
										<HomeIcon />
									</ListItemIcon>
									<ListItemText
										primary='الرئيسية'
										sx={{
											opacity: open
												? 1
												: 0,
										}}
									/>
								</ListItemButton>
							</ListItem>
						</Link>

						{ifNotDashboardHomePage && (
							<Link
								to={`/dashboard/admin/${
									user && user?.profile
								}`}
							>
								<ListItem
									disablePadding
									sx={{
										display: 'block',
										color: 'primary.main',
									}}
								>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open
												? 'initial'
												: 'center',
											px: 2.5,
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open
													? 3
													: 'auto',
												justifyContent:
													'center',
											}}
										>
											<DashboardIcon />
										</ListItemIcon>
										<ListItemText
											primary='لوحة التحكم'
											sx={{
												opacity: open
													? 1
													: 0,
											}}
										/>
									</ListItemButton>
								</ListItem>
							</Link>
						)}

						<Link
							to={`/dashboard/admin/${
								user && user?.profile
							}/account-settings`}
						>
							<ListItem
								disablePadding
								sx={{
									display: 'block',
									color: 'primary.main',
								}}
							>
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open
											? 'initial'
											: 'center',
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open
												? 3
												: 'auto',
											justifyContent:
												'center',
										}}
									>
										<SettingsIcon />
									</ListItemIcon>
									<ListItemText
										primary='إعدادات الحساب'
										sx={{
											opacity: open
												? 1
												: 0,
										}}
									/>
								</ListItemButton>
							</ListItem>
						</Link>

						{user?.role === 'admin' && (
							<Link to='/dashboard/settings/users'>
								<ListItem
									disablePadding
									sx={{
										display: 'block',
										color: 'primary.main',
									}}
								>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open
												? 'initial'
												: 'center',
											px: 2.5,
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open
													? 3
													: 'auto',
												justifyContent:
													'center',
											}}
										>
											<AdminPanelSettingsIcon />
										</ListItemIcon>
										<ListItemText
											primary='المستخدمين'
											sx={{
												opacity: open
													? 1
													: 0,
											}}
										/>
									</ListItemButton>
								</ListItem>
							</Link>
						)}

						{(user?.role === 'admin' ||
							user?.role === 'editor') && (
							<Link to='/dashboard/settings/categories'>
								<ListItem
									disablePadding
									sx={{
										display: 'block',
										color: 'primary.main',
									}}
								>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open
												? 'initial'
												: 'center',
											px: 2.5,
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open
													? 3
													: 'auto',
												justifyContent:
													'center',
											}}
										>
											<CategoryIcon />
										</ListItemIcon>
										<ListItemText
											primary='الأقسام'
											sx={{
												opacity: open
													? 1
													: 0,
											}}
										/>
									</ListItemButton>
								</ListItem>
							</Link>
						)}

						{(user?.role === 'admin' ||
							user?.role === 'editor') && (
							<Link to='/dashboard/settings/brands'>
								<ListItem
									disablePadding
									sx={{
										display: 'block',
										color: 'primary.main',
									}}
								>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open
												? 'initial'
												: 'center',
											px: 2.5,
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open
													? 3
													: 'auto',
												justifyContent:
													'center',
											}}
										>
											<BrandingWatermarkIcon />
										</ListItemIcon>
										<ListItemText
											primary='العلامات التجارية'
											sx={{
												opacity: open
													? 1
													: 0,
											}}
										/>
									</ListItemButton>
								</ListItem>
							</Link>
						)}

						{(user?.role === 'admin' ||
							user?.role === 'editor') && (
							<Link to='/dashboard/settings/products'>
								<ListItem
									disablePadding
									sx={{
										display: 'block',
										color: 'primary.main',
									}}
								>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open
												? 'initial'
												: 'center',
											px: 2.5,
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open
													? 3
													: 'auto',
												justifyContent:
													'center',
											}}
										>
											<Inventory2Icon />
										</ListItemIcon>
										<ListItemText
											primary='المنتجات'
											sx={{
												opacity: open
													? 1
													: 0,
											}}
										/>
									</ListItemButton>
								</ListItem>
							</Link>
						)}

						{(user?.role === 'admin' ||
							user?.role === 'editor') && (
							<Link to='/dashboard/settings/promos'>
								<ListItem
									disablePadding
									sx={{
										display: 'block',
										color: 'primary.main',
									}}
								>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open
												? 'initial'
												: 'center',
											px: 2.5,
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open
													? 3
													: 'auto',
												justifyContent:
													'center',
											}}
										>
											<DiscountIcon />
										</ListItemIcon>
										<ListItemText
											primary='كوبونات الخصم'
											sx={{
												opacity: open
													? 1
													: 0,
											}}
										/>
									</ListItemButton>
								</ListItem>
							</Link>
						)}

						{(user?.role === 'admin' ||
							user?.role === 'editor') && (
							<Link to='/dashboard/settings/banners'>
								<ListItem
									disablePadding
									sx={{
										display: 'block',
										color: 'primary.main',
									}}
								>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open
												? 'initial'
												: 'center',
											px: 2.5,
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open
													? 3
													: 'auto',
												justifyContent:
													'center',
											}}
										>
											<ViewCarouselIcon />
										</ListItemIcon>
										<ListItemText
											primary='اللافتات'
											sx={{
												opacity: open
													? 1
													: 0,
											}}
										/>
									</ListItemButton>
								</ListItem>
							</Link>
						)}

						{(user?.role === 'admin' ||
							user?.role === 'staff') && (
							<Link to='/dashboard/settings/orders'>
								<ListItem
									disablePadding
									sx={{
										display: 'block',
										color: 'primary.main',
									}}
								>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open
												? 'initial'
												: 'center',
											px: 2.5,
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open
													? 3
													: 'auto',
												justifyContent:
													'center',
											}}
										>
											<LocalShippingIcon />
										</ListItemIcon>
										<ListItemText
											primary={
												<Badge
													badgeContent={
														pendingOrders?.length ||
														0
													}
													color='primary'
												>
													الطلبات
												</Badge>
											}
											sx={{
												opacity: open
													? 1
													: 0,
											}}
										/>
									</ListItemButton>
								</ListItem>
							</Link>
						)}

						{(user?.role === 'admin' ||
							user?.role === 'editor') && (
							<Link to='/dashboard/settings/districts'>
								<ListItem
									disablePadding
									sx={{
										display: 'block',
										color: 'primary.main',
									}}
								>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open
												? 'initial'
												: 'center',
											px: 2.5,
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open
													? 3
													: 'auto',
												justifyContent:
													'center',
											}}
										>
											<LocationSearchingIcon />
										</ListItemIcon>
										<ListItemText
											primary='المناطق المدعومة'
											sx={{
												opacity: open
													? 1
													: 0,
											}}
										/>
									</ListItemButton>
								</ListItem>
							</Link>
						)}

						<ListItem
							disablePadding
							sx={{
								display: 'block',
								color: 'primary.main',
							}}
						>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open
										? 'initial'
										: 'center',
									px: 2.5,
								}}
								onClick={handleLogout}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center',
									}}
								>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText
									primary='تسجيل الخروج'
									sx={{
										opacity: open ? 1 : 0,
									}}
								/>
							</ListItemButton>
						</ListItem>
					</List>
					<Divider />
				</Drawer>

				<Box
					component='main'
					sx={{ flexGrow: 1, py: 3 }}
				>
					<DrawerHeader />
					<main dir='rtl'>
						<Outlet />
					</main>
				</Box>
			</Box>
		</>
	);
}
