import { useEffect } from 'react';
import {
	Container,
	Nav,
	Navbar,
	NavDropdown,
	Image,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../default_avatar.png';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { IUser, fetchUser, logOut } from '../controllers/user';

function AccountNavbar() {
	const dispatch = useAppDispatch();
	const user: IUser | any = useAppSelector(
		(state) => state.user,
	);
	console.log(user);

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	const handleLogout = async () => {
		await logOut();
		dispatch(fetchUser());
		navigate('/');
	};

	return (
		<Navbar
			collapseOnSelect
			expand='lg'
			className='shadow mb-3'
			style={{ backgroundColor: '#334455' }}
		>
			<Container>
				<Navbar.Brand href='/' className='text-white'>
					React-Bootstrap
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
									src={
										user?.photoURL == null
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
	);
}

export default AccountNavbar;
