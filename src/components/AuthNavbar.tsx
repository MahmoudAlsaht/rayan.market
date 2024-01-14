import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
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
				<Nav className='me-auto'>
					<Link to='#' onClick={() => navigate(-1)}>
						<Button variant='outline-secondary'>
							<BsArrowLeft className='me-2' />
							Go Back
						</Button>
					</Link>
				</Nav>
			</Container>
		</Navbar>
	);
}

export default AuthNavbar;
