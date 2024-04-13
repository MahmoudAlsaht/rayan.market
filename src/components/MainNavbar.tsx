/* eslint-disable no-mixed-spaces-and-tabs */
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import Logo from '../rayan.marketLogo.png';
import FilterProducts from './FilterProducts';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { TUser } from '../app/auth/auth';
import { fetchUser, logout } from '../controllers/user';
import ScrollToColor01 from './ScrollToColor';
import CategoryNavbar from './CategoryNavbar';
import MobileNavigation from './mobileComponents/MobileNavigation';

const pages = ['العروض', 'المنتجات', 'الرئيسية'].reverse();

export default function MainNavbar() {
	const [anchorElUser, setAnchorElUser] =
		useState<null | HTMLElement>(null);

	const dispatch = useAppDispatch();
	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);

	const isHomePage = window.location.href.search('home');

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	const handleLogout = async () => {
		await dispatch(logout());
		dispatch(fetchUser());
		handleCloseUserMenu();
		navigate('/home');
	};

	const handleOpenUserMenu = (
		event: React.MouseEvent<HTMLElement>,
	) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<main dir='rtl'>
			<Box
				sx={{
					mb: { sm: '5.5rem' },
				}}
			>
				<ScrollToColor01>
					<AppBar
						sx={{
							display: {
								xs: 'none',
								sm: 'block',
							},
						}}
					>
						<Container maxWidth='xl'>
							<Toolbar disableGutters>
								<Typography
									variant='h6'
									noWrap
									component='a'
									sx={{
										mr: 2,
										display: {
											xs: 'none',
											md: 'flex',
										},
										fontFamily: 'monospace',
										fontWeight: 700,
										letterSpacing: '.3rem',
										color: '#000',
										textDecoration: 'none',
										cursor: 'pointer',
									}}
									onClick={() =>
										navigate('/home')
									}
								>
									<img
										width={100}
										src={Logo}
									/>
								</Typography>

								<Box
									sx={{
										flexGrow: 1,
										display: {
											xs: 'none',
											sm: 'flex',
											justifyContent:
												'end',
										},
									}}
								>
									{pages.map((page) => (
										<Button
											key={page}
											onClick={() => {
												navigate(
													page ===
														'الرئيسية'
														? '/home'
														: `/${
																page ===
																'المنتجات'
																	? 'products'
																	: 'offers'
														  }`,
												);
											}}
											sx={{
												my: 2,
												color: 'black',
												display: 'block',
											}}
										>
											{page}
										</Button>
									))}
									<FilterProducts />
								</Box>

								<Box sx={{ flexGrow: 0 }}>
									<Tooltip title='Open settings'>
										<IconButton
											onClick={
												handleOpenUserMenu
											}
											sx={{ p: 0 }}
										>
											<AccountCircleIcon
												sx={{
													fontSize: 30,
													ml: 2,
												}}
											/>
										</IconButton>
									</Tooltip>
									<Menu
										sx={{ mt: '45px' }}
										id='menu-appbar'
										anchorEl={anchorElUser}
										anchorOrigin={{
											vertical: 'top',
											horizontal: 'right',
										}}
										keepMounted
										transformOrigin={{
											vertical: 'top',
											horizontal: 'right',
										}}
										open={Boolean(
											anchorElUser,
										)}
										onClose={
											handleCloseUserMenu
										}
									>
										<legend dir='rtl'>
											{user?.username ===
											'anonymous' ? (
												[
													'التسجيل',
													'تسجيل الدخول',
												].map(
													(
														setting,
													) => (
														<MenuItem
															key={
																setting
															}
															onClick={() =>
																navigate(
																	`/auth/${
																		setting ===
																		'التسجيل'
																			? 'signup'
																			: 'signin'
																	}`,
																)
															}
														>
															<Typography textAlign='center'>
																{
																	setting
																}
															</Typography>
														</MenuItem>
													),
												)
											) : (
												<legend>
													{user?.role !==
													'customer' ? (
														<MenuItem
															onClick={() =>
																navigate(
																	`/dashboard/admin/${user?.profile}`,
																)
															}
														>
															<Typography textAlign='center'>
																لوحة
																التحكم
															</Typography>
														</MenuItem>
													) : (
														<MenuItem
															onClick={() =>
																navigate(
																	`/account/profile/${user?.profile}`,
																)
															}
														>
															<Typography textAlign='center'>
																الصفحة
																الشخصية
															</Typography>
														</MenuItem>
													)}
													<MenuItem
														onClick={
															handleLogout
														}
													>
														<Typography textAlign='center'>
															تسجيل
															الخروج
														</Typography>
													</MenuItem>
												</legend>
											)}
										</legend>
									</Menu>
								</Box>
							</Toolbar>
						</Container>
						{isHomePage === -1 && <CategoryNavbar />}
					</AppBar>
				</ScrollToColor01>
				<Box sx={{ display: { sm: 'none' } }}>
					<MobileNavigation />
				</Box>
			</Box>
		</main>
	);
}
