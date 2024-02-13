import {
	Container,
	Nav,
	Navbar,
	NavDropdown,
	Image,
	Button,
	Offcanvas,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import defaultAvatar from '../default_avatar.png';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUser, logout } from '../controllers/user';
import { TUser } from '../app/auth/auth';
import { BsJustify } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import '../assets/styles/MainNavbar.css';
import { TProfile } from '../app/auth/profile';
import { fetchProfile } from '../controllers/profile';

function MainNavbar({
	setIsDropDownOpen,
}: {
	setIsDropDownOpen?: (status: boolean) => void;
}) {
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

	const navigate = useNavigate();

	const handleDropdownClick = () => {
		if (setIsDropDownOpen) setIsDropDownOpen(true);
	};

	useEffect(() => {
		dispatch(fetchUser());
		dispatch(fetchProfile(user?.profile as string));
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
				className='bg-white d-none d-md-block'
				id='mainNavbar'
			>
				<Container>
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav className='me-auto'>
							<Nav.Link>
								<Link
									to='/home'
									className='navLink'
								>
									Store
								</Link>
							</Nav.Link>
							<Nav.Link>
								<Link
									to='/offers'
									className='navLink'
								>
									Offers
								</Link>
							</Nav.Link>
							<Nav.Link>
								<Link
									to='/about'
									className='navLink'
								>
									About
								</Link>
							</Nav.Link>
						</Nav>
						<Nav className='ms-auto'>
							{user.username !== 'anonymous' ? (
								<NavDropdown
									onClick={handleDropdownClick}
									title={
										<Image
											className='rounded-circle'
											width={30}
											height={30}
											src={
												profile
													?.profileImage
													?.path ||
												defaultAvatar
											}
										/>
									}
									id='collapsible-nav-dropdown'
								>
									{user?.isAdmin ? (
										<NavDropdown.Item>
											<Link
												to={`/dashboard/admin/${user?.profile}`}
											>
												Dashboard
											</Link>
										</NavDropdown.Item>
									) : (
										<NavDropdown.Item>
											<Link
												to={`/account/profile/${user?._id}`}
											>
												Profile
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
							) : (
								<NavDropdown
									title={
										<Image
											className='rounded-circle'
											width={30}
											src={defaultAvatar}
										/>
									}
									id='collapsible-nav-dropdown'
								>
									<NavDropdown.Item>
										<Link to='/auth/signin'>
											Signin
										</Link>
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item>
										<Link to='/auth/signup'>
											Signup
										</Link>
									</NavDropdown.Item>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<Navbar
				collapseOnSelect
				className='bg-white d-md-none'
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
			>
				<Offcanvas.Header closeButton />
				<Offcanvas.Body>
					<Nav className='flex-column justify-content-center'>
						<Nav.Link onClick={handleClick}>
							<Link
								className='text-info'
								to='/home'
							>
								Store
							</Link>
						</Nav.Link>
						<Nav.Link onClick={handleClick}>
							<Link
								className='text-info'
								to='/offers'
							>
								Offers
							</Link>
						</Nav.Link>
						<Nav.Link onClick={handleClick}>
							<Link
								className='text-info'
								to='/about'
							>
								About
							</Link>
						</Nav.Link>
						<hr />

						{user?.username !== 'anonymous' ? (
							<div>
								{user?.isAdmin ? (
									<Nav.Link
										onClick={handleClick}
									>
										<Link
											to={`/dashboard/admin/${user?.profile}`}
											className='text-info'
										>
											Dashboard
										</Link>
									</Nav.Link>
								) : (
									<Nav.Link
										onClick={handleClick}
									>
										<Link
											to={`/account/profile/${user?.profile}`}
											className='text-info'
										>
											Profile
										</Link>
									</Nav.Link>
								)}

								<Nav.Link
									onClick={handleLogout}
									className='mb-2 text-primary'
								>
									Logout
								</Nav.Link>
							</div>
						) : (
							<div>
								<Nav.Link onClick={handleClick}>
									<Link
										to='/auth/signin'
										className='text-info'
									>
										Signin
									</Link>
								</Nav.Link>
								<Nav.Link onClick={handleClick}>
									<Link
										to='/auth/signup'
										className='text-info'
									>
										Signup
									</Link>
								</Nav.Link>
							</div>
						)}
					</Nav>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}

export default MainNavbar;
