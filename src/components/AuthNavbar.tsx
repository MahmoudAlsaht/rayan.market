import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function AuthNavbar() {
	const navigate = useNavigate();
	return (
		<Navbar
			collapseOnSelect
			expand='lg'
			className='bg-white shadow mb-3'
		>
			<Container>
				<Navbar.Brand>
					<Link to='/'>mStore</Link>
				</Navbar.Brand>
				<Nav className='ms-auto'>
					<Link to='#' onClick={() => navigate(-1)}>
						<Button variant='outline-secondary'>
							Go Back
							<BsArrowRight className='ms-2' />
						</Button>
					</Link>
				</Nav>
			</Container>
		</Navbar>
	);
}

export default AuthNavbar;
