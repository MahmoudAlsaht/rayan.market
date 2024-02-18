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
import FilterProducts from './FilterProducts';

const MainNavbar = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const dispatch = useAppDispatch();
	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

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
		<div>
			<Navbar
				collapseOnSelect
				expand='md'
				className='arb-text bg-white d-none d-md-block'
				id='mainNavbar'
				style={{
					zIndex: 2,
				}}
			>
				<Container>
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav className='ms-auto'>
							<Nav.Link>
								<Link
									to='/home'
									className='navLink'
								>
									الرئيسية
								</Link>
							</Nav.Link>
							<Nav.Link>
								<Link
									to='/offers'
									className='navLink'
								>
									العروض
								</Link>
							</Nav.Link>
							<FilterProducts />
						</Nav>

						<Nav className='me-auto'>
							{user.username !== 'anonymous' ? (
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
									{user?.isAdmin ? (
										<NavDropdown.Item>
											<Link
												to={`/dashboard/admin/${user?.profile}`}
											>
												لوحة التحكم
											</Link>
										</NavDropdown.Item>
									) : (
										<NavDropdown.Item>
											<Link
												to={`/account/profile/${user?._id}`}
											>
												الصفحة الشخصية
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
											تسجيل الدخول
										</Link>
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item>
										<Link to='/auth/signup'>
											التسجيل
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
				<Nav className='arb-text'>
					<FilterProducts />
				</Nav>
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
					<Nav className='flex-column justify-content-center arb-text'>
						<Nav.Link onClick={handleClick}>
							<Link
								className='text-info'
								to='/home'
							>
								الرئيسية
							</Link>
						</Nav.Link>
						<Nav.Link onClick={handleClick}>
							<Link
								className='text-info'
								to='/offers'
							>
								العروض
							</Link>
						</Nav.Link>
						<Nav.Link onClick={handleClick}>
							<Link
								className='text-info'
								to='/about'
							>
								حول
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
											لوحة التحكم
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
											الصفحة الشخصية
										</Link>
									</Nav.Link>
								)}

								<Nav.Link
									onClick={handleLogout}
									className='mb-2 text-primary'
								>
									تسجيل الخروج
								</Nav.Link>
							</div>
						) : (
							<div>
								<Nav.Link onClick={handleClick}>
									<Link
										to='/auth/signin'
										className='text-info'
									>
										تسجيل الدخول
									</Link>
								</Nav.Link>
								<Nav.Link onClick={handleClick}>
									<Link
										to='/auth/signup'
										className='text-info'
									>
										التسجيل
									</Link>
								</Nav.Link>
							</div>
						)}
					</Nav>
				</Offcanvas.Body>
			</Offcanvas>
		</div>
	);
};

export default MainNavbar;
