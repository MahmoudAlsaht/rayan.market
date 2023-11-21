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
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUser, logOut } from '../controllers/user';
import { IUser } from '../app/auth/auth';
import { BsJustify } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import '../assets/styles/MainNavbar.css';

function MainNavbar() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const dispatch = useAppDispatch();
	const user: IUser | any = useAppSelector(
		(state) => state.user,
	);

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	const handleLogout = async () => {
		await logOut();
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
				className='bg-white d-none d-md-block'
				sticky='top'
			>
				<Container>
					<Navbar.Brand href='/'>mStore</Navbar.Brand>
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav className='me-auto'>
							<Nav.Link
								href='/'
								className='navLink'
							>
								Store
							</Nav.Link>
							<Nav.Link
								href='/store/products'
								className='navLink'
							>
								Products
							</Nav.Link>
							<Nav.Link
								href='/about'
								className='navLink'
							>
								About
							</Nav.Link>
						</Nav>
						<Nav className='ms-auto'>
							{user != null ? (
								<NavDropdown
									title={
										<Image
											className='rounded-circle'
											width={30}
											height={30}
											src={
												user?.photoURL ||
												defaultAvatar
											}
										/>
									}
									id='collapsible-nav-dropdown'
								>
									{user?.isAdmin ? (
										<NavDropdown.Item
											href={`/dashboard/admin/${user?.profile}`}
										>
											Dashboard
										</NavDropdown.Item>
									) : (
										<NavDropdown.Item
											href={`/account/profile/${user.profile}`}
										>
											Profile
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
									<NavDropdown.Item href='/auth/signin'>
										Signin
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href='/auth/signup'>
										Signup
									</NavDropdown.Item>
								</NavDropdown>
							)}
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
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>
						<Navbar.Brand href='/'>
							mStore
						</Navbar.Brand>
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Nav className='flex-column justify-content-center'>
						<Nav.Link href='/'>Store</Nav.Link>
						<Nav.Link href='/store/products'>
							Products
						</Nav.Link>
						<Nav.Link href='/about'>About</Nav.Link>
						<hr />

						{user != null ? (
							<div>
								{user.isAdmin ? (
									<Nav.Link
										href='/dashboard'
										onClick={handleClick}
									>
										Dashboard
									</Nav.Link>
								) : (
									<Nav.Link
										href={`/account/profile/${user.profile}`}
										onClick={handleClick}
									>
										Profile
									</Nav.Link>
								)}

								<Nav.Link
									href='#'
									onClick={handleLogout}
									className='mb-2 text-primary'
								>
									Logout
								</Nav.Link>
							</div>
						) : (
							<div>
								<Nav.Link
									href='/auth/signin'
									onClick={handleClick}
								>
									Signin
								</Nav.Link>
								<Nav.Link
									href='/auth/signup'
									onClick={handleClick}
								>
									Signup
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
