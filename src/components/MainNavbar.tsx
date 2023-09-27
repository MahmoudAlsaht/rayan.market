import {
	Container,
	Nav,
	Navbar,
	NavDropdown,
	Form,
	Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';

function MainNavbar() {
	return (
		<Navbar
			collapseOnSelect
			expand='lg'
			className='bg-white shadow mb-3'
		>
			<Container>
				<Navbar.Brand>
					<Link to='/'>React-Bootstrap</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link href='#features'>
							<Link to='/'>Home</Link>
						</Nav.Link>
						<Nav.Link href='#pricing'>
							<Link to='/about'>About</Link>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				<Form className='d-flex me-5'>
					<Form.Control
						type='search'
						placeholder='Search'
						className='me-2'
						aria-label='Search'
					/>
					<Button variant='outline-success'>
						Search
					</Button>
				</Form>

				<NavDropdown
					title={<BsFillPersonFill />}
					id='collapsible-nav-dropdown'
				>
					<NavDropdown.Item>
						<Link to='/auth/signup'>Signup</Link>
					</NavDropdown.Item>
					<NavDropdown.Item>
						<Link to='/auth/signin'>Signin</Link>
					</NavDropdown.Item>
					<NavDropdown.Item>
						<Link to='#'>Logout</Link>
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item>
						<Link to='/profile'>Profile</Link>
					</NavDropdown.Item>
				</NavDropdown>
			</Container>
		</Navbar>
	);
}

export default MainNavbar;
