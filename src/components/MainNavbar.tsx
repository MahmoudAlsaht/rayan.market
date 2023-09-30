import {
	Container,
	Nav,
	Navbar,
	NavDropdown,
	Image,
} from 'react-bootstrap';
// import { BsFillPersonFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../public/default_avatar.png';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { IUser, fetchUser, logOut } from '../controllers/user';

function MainNavbar() {
	const dispatch = useAppDispatch();
	const user: IUser | any = useAppSelector(
		(state) => state.user,
	);

	const navigate = useNavigate();

	const handleLogout = async () => {
		await logOut();
		dispatch(fetchUser());
		navigate('/');
	};

	return (
		<Navbar
			collapseOnSelect
			expand='lg'
			className='bg-white shadow mb-3'
		>
			<Container>
				<Navbar.Brand href='/'>
					React-Bootstrap
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link href='/'>Home</Nav.Link>
						<Nav.Link href='/about'>About</Nav.Link>
					</Nav>
					<Nav className='ms-auto'>
						{user != null ? (
							<NavDropdown
								title={
									<Image
										className='rounded-circle'
										width={30}
										src={
											user.photoURL == null
												? defaultAvatar
												: user.photoURL
										}
									/>
								}
								id='collapsible-nav-dropdown'
							>
								<NavDropdown.Item href='/profile'>
									Profile
								</NavDropdown.Item>
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
	);
}

export default MainNavbar;
