import { Navbar } from 'react-bootstrap';
import Logo from '../mStoreLogo.png';

function BrandNavbar() {
	return (
		<Navbar className='justify-content-center bg-white'>
			<Navbar.Brand href='/'>
				<img src={Logo} alt='mStore logo' width={200} />
			</Navbar.Brand>
		</Navbar>
	);
}

export default BrandNavbar;
