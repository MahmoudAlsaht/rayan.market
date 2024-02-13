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
import { TProfile } from '../app/auth/profile';
import { fetchProfile } from '../controllers/profile';

function AccountNavbar() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const dispatch = useAppDispatch();
	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);

	const profile: TProfile | null = useAppSelector(
		(state) => state.profile,
	);

	const isAccountSettingPage =
		window.location.pathname.includes('account-setting');

	const isOrdersPage =
		window.location.pathname.includes('orders-history');

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchUser());
		dispatch(fetchProfile(user?.profile));
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
							>
								Store
							</Link>
						</Nav.Link>
					</Nav>
					<Nav className='ms-auto'>
						<NavDropdown
							title={
								<Image
									className='rounded-circle'
									width={30}
									height={30}
									src={
										profile?.profileImage
											?.path ||
										defaultAvatar
									}
								/>
							}
							id='collapsible-nav-dropdown'
						>
							{!isAccountSettingPage && (
								<NavDropdown.Item>
									<Link
										to={`/account/profile/${user?.profile}/account-setting`}
									>
										Settings
									</Link>
								</NavDropdown.Item>
							)}
							{!isOrdersPage && (
								<NavDropdown.Item>
									<Link
										to={`/account/profile/${user?.profile}/orders-history`}
									>
										Orders
									</Link>
								</NavDropdown.Item>
							)}
							{(isAccountSettingPage ||
								isOrdersPage) &&
							user?.isAdmin ? (
								<NavDropdown.Item>
									<Link
										to={`/dashboard/admin/${user?.profile}`}
									>
										Dashboard
									</Link>
								</NavDropdown.Item>
							) : (
								(isAccountSettingPage ||
									isOrdersPage) && (
									<NavDropdown.Item>
										<Link
											to={`/account/profile/${user?.profile}`}
										>
											Profile
										</Link>
									</NavDropdown.Item>
								)
							)}
							{!user?.isAdmin && (
								<NavDropdown.Item>
									<Link
										to={`/account/profile/${user?.profile}/contact-info`}
									>
										Contact Info
									</Link>
								</NavDropdown.Item>
							)}
							<NavDropdown.Divider />
							<NavDropdown.Item
								onClick={handleLogout}
							>
								Logout
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
								Store
							</Link>
						</Nav.Link>
						<hr />

						<div>
							{!isAccountSettingPage && (
								<Nav.Link onClick={handleClick}>
									<Link
										className='text-white'
										to={`/account/profile/${user?.profile}/account-setting`}
									>
										Settings
									</Link>
								</Nav.Link>
							)}
							{!isOrdersPage && (
								<Nav.Link onClick={handleClick}>
									<Link
										className='text-white'
										to={`/account/profile/${user?.profile}/orders-history`}
									>
										Orders
									</Link>
								</Nav.Link>
							)}
							{(isAccountSettingPage ||
								isOrdersPage) &&
							user?.isAdmin ? (
								<Nav.Link onClick={handleClick}>
									<Link
										className='text-white'
										to={`/dashboard/admin/${user?.profile}`}
									>
										Dashboard
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
											to={`/account/profile/${user?.profile}`}
										>
											Profile
										</Link>
									</Nav.Link>
								)
							)}

							{!user?.isAdmin && (
								<Nav.Link onClick={handleClick}>
									<Link
										className='text-white'
										to={`/account/profile/${user?.profile}/contact-info`}
									>
										Contact Info
									</Link>
								</Nav.Link>
							)}
							<Nav.Link
								onClick={handleLogout}
								className='text-white'
							>
								Logout
							</Nav.Link>
						</div>
					</Nav>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}

export default AccountNavbar;
