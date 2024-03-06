/* eslint-disable no-mixed-spaces-and-tabs */
import {
	AppBar,
	Box,
	Container,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import { TUser } from '../../app/auth/auth';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { fetchUser, logout } from '../../controllers/user';
import NotFound404 from '../../routes/NotFound404';

export default function MobileOptions() {
	const navigate = useNavigate();

	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);
	const dispatch = useAppDispatch();

	const handleLogout = async () => {
		await dispatch(logout());
		dispatch(fetchUser());
		navigate('/home');
	};

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	return (
		<>
			<Box
				sx={{
					display: { xs: 'none', sm: 'block' },
				}}
			>
				<NotFound404 />
			</Box>

			<Box
				sx={{
					display: { sm: 'none' },
				}}
			>
				<main dir='rtl'>
					<AppBar
						sx={{
							position: 'relative',
							bgcolor: '#fff',
						}}
					>
						<Toolbar>
							<IconButton
								edge='start'
								sx={{ color: 'black' }}
								aria-label='close'
								onClick={() => navigate(-1)}
							>
								<KeyboardArrowRightIcon />
							</IconButton>
						</Toolbar>
					</AppBar>

					<Container
						sx={{
							margin: '1rem 0',
							color: 'primary.main',
						}}
					>
						<List>
							{user &&
							user.username !== 'anonymous' ? (
								<legend>
									<ListItem>
										<ListItemButton
											onClick={() =>
												navigate(
													user?.role !==
														'customer'
														? `/dashboard/admin/${user?.profile}`
														: `/account/profile/${user?.profile}`,
												)
											}
											sx={{
												'&:hover': {
													color: 'black',
												},
											}}
										>
											<ListItemIcon>
												<DashboardIcon />
											</ListItemIcon>
											<ListItemText
												primary={
													user?.role !==
													'customer'
														? 'لوحة التحكم'
														: 'الصفحة الشخصية'
												}
												sx={{
													ml: '1rem',
												}}
											/>
										</ListItemButton>
									</ListItem>
									<ListItem>
										<ListItemButton
											onClick={
												handleLogout
											}
											sx={{
												'&:hover': {
													color: 'black',
												},
											}}
										>
											<ListItemIcon>
												<LogoutIcon />
											</ListItemIcon>
											<ListItemText
												primary={
													'تسجيل الخروج'
												}
												sx={{
													ml: '1rem',
												}}
											/>
										</ListItemButton>
									</ListItem>
								</legend>
							) : (
								<legend>
									<ListItem>
										<ListItemButton
											href={`/auth/signup`}
											sx={{
												'&:hover': {
													color: 'black',
												},
											}}
										>
											<ListItemIcon>
												<ExitToAppIcon />
											</ListItemIcon>
											<ListItemText
												primary={
													'التسجيل'
												}
												sx={{
													ml: '1rem',
												}}
											/>
										</ListItemButton>
									</ListItem>

									<ListItem>
										<ListItemButton
											href={`/auth/signin`}
											sx={{
												'&:hover': {
													color: 'black',
												},
											}}
										>
											<ListItemIcon>
												<LoginIcon />
											</ListItemIcon>
											<ListItemText
												primary={
													'تسجيل الدخول'
												}
												sx={{
													ml: '1rem',
												}}
											/>
										</ListItemButton>
									</ListItem>
								</legend>
							)}
						</List>
					</Container>
				</main>
			</Box>
		</>
	);
}
