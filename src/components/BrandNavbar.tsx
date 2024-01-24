import { Navbar } from 'react-bootstrap';
import Logo from '../mStoreLogo.png';

function BrandNavbar() {
	return (
		<Navbar
			className='justify-content-center'
			// style={{ height: '100px' }}
		>
			<Navbar.Brand href='/'>
				<img src={Logo} alt='logo' width={200} />
			</Navbar.Brand>
		</Navbar>
	);
}

export default BrandNavbar;
