import { useEffect, useState } from 'react';
import {
	Container,
	Nav,
	Navbar,
	NavDropdown,
	Image,
	Button,
	Offcanvas,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchUser());
		dispatch(fetchProfile(user?.profile));
	}, [dispatch, user?.profile]);

	const handleLogout = async () => {
		await dispatch(logout());
		dispatch(fetchUser());
		handleClose();
		navigate('/');
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
				sticky='top'
				style={{ backgroundColor: '#334455' }}
			>
				<Container>
					<Navbar.Brand
						href='/'
						className='text-white'
					>
						mStore
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav className='me-auto'>
							<Nav.Link
								className='text-white'
								href='/'
							>
								Store
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
											profile?.photoURL ||
											defaultAvatar
										}
									/>
								}
								id='collapsible-nav-dropdown'
							>
								{!isAccountSettingPage ? (
									<NavDropdown.Item
										href={`/account/profile/${user?.profile}/account-setting`}
									>
										Settings
									</NavDropdown.Item>
								) : user?.isAdmin ? (
									<NavDropdown.Item
										href={`/dashboard/admin/${user?.profile}`}
									>
										Dashboard
									</NavDropdown.Item>
								) : (
									<NavDropdown.Item
										href={`/account/profile/${user?.profile}`}
									>
										Profile
									</NavDropdown.Item>
								)}
								{!user?.isAdmin && (
									<NavDropdown.Item
										href={`/account/profile/${user?.profile}/contact-info`}
									>
										Contact Info
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
				</Container>
			</Navbar>

			<Navbar
				collapseOnSelect
				className='bg-none mb-3 d-md-none'
				sticky='top'
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
				<Offcanvas.Header closeButton>
					<Offcanvas.Title className='text-white'>
						<Navbar.Brand href='/'>
							mStore
						</Navbar.Brand>
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Nav className='flex-column justify-content-center'>
						<Nav.Link
							className='text-white'
							href='/'
						>
							Store
						</Nav.Link>
						<hr />

						<div>
							{!isAccountSettingPage ? (
								<Nav.Link
									href={`/account/profile/${user?.profile}/account-setting`}
									onClick={handleClick}
									className='text-white'
								>
									Settings
								</Nav.Link>
							) : user?.isAdmin ? (
								<Nav.Link
									href={`/dashboard/admin/${user?.profile}`}
									onClick={handleClick}
									className='text-white'
								>
									Dashboard
								</Nav.Link>
							) : (
								<Nav.Link
									href={`/account/profile/${user?.profile}`}
									onClick={handleClick}
									className='text-white'
								>
									Profile
								</Nav.Link>
							)}

							{!user?.isAdmin && (
								<Nav.Link
									href={`/account/profile/${user?.profile}/contact-info`}
									onClick={handleClick}
									className='text-white'
								>
									Contact Info
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
