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
import { IUser, fetchUser, logOut } from '../controllers/user';

function AccountNavbar() {
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
											user?.photoURL ==
											null
												? defaultAvatar
												: user?.photoURL
										}
									/>
								}
								id='collapsible-nav-dropdown'
							>
								<NavDropdown.Item
									href={`/account/profile/${user?.profile}/account-setting`}
								>
									Account Settings
								</NavDropdown.Item>
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
						<hr />

						<div>
							<Nav.Link
								href={`/account/profile/${user?.profile}/account-setting`}
								onClick={handleClick}
							>
								Account Settings
							</Nav.Link>
							<Nav.Link onClick={handleLogout}>
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
