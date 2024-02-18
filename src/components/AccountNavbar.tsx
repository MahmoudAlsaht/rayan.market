import { useEffect, useState } from 'react';
import {
	Nav,
	Navbar,
	NavDropdown,
	Image,
	Button,
	Offcanvas,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import defaultAvatar from '../default_avatar.png';
import { BsJustify } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUser, logout } from '../controllers/user';
import { TUser } from '../app/auth/auth';
import Logo from '../rayan.marketLogo.png';

function AccountNavbar() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const dispatch = useAppDispatch();
	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);

	const isAccountSettingPage =
		window.location.pathname.includes('account-setting');

	const isOrdersPage =
		window.location.pathname.includes('orders-history');

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch, user?.profile]);

	const handleLogout = async () => {
		await dispatch(logout());
		dispatch(fetchUser());
		handleClose();
		navigate('/home');
	};

	const handleClick = () => {
		handleClose();
	};

	return (
		<>
			<Navbar
				collapseOnSelect
				expand='md'
				className='shadow mb-3 d-none d-md-block'
				style={{ backgroundColor: '#334455' }}
			>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link>
							<Link
								to='/home'
								className='text-white'
								style={{ marginLeft: '3.5rem' }}
							>
								<img
									src={Logo}
									alt='Al Rayyan International Markets'
									width={90}
								/>
							</Link>
						</Nav.Link>
					</Nav>
					<Nav
						className='ms-auto'
						style={{ marginRight: '3.5rem' }}
					>
						<NavDropdown
							title={
								<Image
									className='rounded-circle'
									width={30}
									height={30}
									src={defaultAvatar}
								/>
							}
							id='collapsible-nav-dropdown'
						>
							{!isAccountSettingPage && (
								<NavDropdown.Item>
									<Link
										to={`/account/profile/${
											user && user?.profile
										}/account-setting`}
									>
										اعدادات الحساب
									</Link>
								</NavDropdown.Item>
							)}
							{!isOrdersPage && (
								<NavDropdown.Item>
									<Link
										to={`/account/profile/${
											user && user?.profile
										}/orders-history`}
									>
										طلباتي
									</Link>
								</NavDropdown.Item>
							)}
							{(isAccountSettingPage ||
								isOrdersPage) &&
							user?.role !== 'customer' ? (
								<NavDropdown.Item>
									<Link
										to={`/dashboard/admin/${
											user && user?.profile
										}`}
									>
										لوحة التحكم
									</Link>
								</NavDropdown.Item>
							) : (
								(isAccountSettingPage ||
									isOrdersPage) && (
									<NavDropdown.Item>
										<Link
											to={`/account/profile/${
												user &&
												user?.profile
											}`}
										>
											الصفحة الشخصية
										</Link>
									</NavDropdown.Item>
								)
							)}
							{user &&
								user?.role === 'customer' && (
									<NavDropdown.Item>
										<Link
											to={`/account/profile/${
												user &&
												user?.profile
											}/contact-info`}
										>
											معلومات الإتصال
										</Link>
									</NavDropdown.Item>
								)}
							<NavDropdown.Divider />
							<NavDropdown.Item
								onClick={handleLogout}
							>
								تسجيل الخروج
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Navbar>

			<Navbar
				collapseOnSelect
				className='bg-none mb-3 d-md-none'
			>
				<Nav className='ms-auto'>
					<Button
						variant='none'
						onClick={handleShow}
						style={{
							border: '1px solid #bbb',
						}}
					>
						<BsJustify
							style={{
								color: '#000',
								fontSize: '30px',
							}}
						/>
					</Button>
				</Nav>
			</Navbar>

			<Offcanvas
				show={show}
				onHide={handleClose}
				placement='end'
				className='d-md-none'
				style={{ backgroundColor: '#334455' }}
			>
				<Offcanvas.Header closeButton />
				<Offcanvas.Body>
					<Nav className='flex-column justify-content-center'>
						<Nav.Link>
							<Link
								to='/home'
								className='text-white'
							>
								المتجر
							</Link>
						</Nav.Link>
						<hr />

						<div>
							{!isAccountSettingPage && (
								<Nav.Link onClick={handleClick}>
									<Link
										className='text-white'
										to={`/account/profile/${
											user && user?.profile
										}/account-setting`}
									>
										اعدادات الحساب
									</Link>
								</Nav.Link>
							)}
							{!isOrdersPage && (
								<Nav.Link onClick={handleClick}>
									<Link
										className='text-white'
										to={`/account/profile/${
											user && user?.profile
										}/orders-history`}
									>
										طلباتي
									</Link>
								</Nav.Link>
							)}
							{(isAccountSettingPage ||
								isOrdersPage) &&
							user?.role !== 'customer' ? (
								<Nav.Link onClick={handleClick}>
									<Link
										className='text-white'
										to={`/dashboard/admin/${
											user && user?.profile
										}`}
									>
										لوحة التحكم
									</Link>
								</Nav.Link>
							) : (
								(isAccountSettingPage ||
									isOrdersPage) && (
									<Nav.Link
										onClick={handleClick}
									>
										<Link
											className='text-white'
											to={`/account/profile/${
												user &&
												user?.profile
											}`}
										>
											الصفحة الشخصية
										</Link>
									</Nav.Link>
								)
							)}

							{user &&
								user?.role === 'customer' && (
									<Nav.Link
										onClick={handleClick}
									>
										<Link
											className='text-white'
											to={`/account/profile/${
												user &&
												user?.profile
											}/contact-info`}
										>
											معلومات الإتصال
										</Link>
									</Nav.Link>
								)}
							<Nav.Link
								onClick={handleLogout}
								className='text-white'
							>
								تسجيل الخروج
							</Nav.Link>
						</div>
					</Nav>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}

export default AccountNavbar;
