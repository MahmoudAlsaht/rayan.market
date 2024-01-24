import { Navbar } from 'react-bootstrap';

function BrandNavbar() {
	return (
		<Navbar className='justify-content-center'>
			<Navbar.Brand href='/'>
				<h1>mStore</h1>
			</Navbar.Brand>
		</Navbar>
	);
}

export default BrandNavbar;
