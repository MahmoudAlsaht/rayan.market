import { Navbar } from 'react-bootstrap';
import Logo from '../mStoreLogo.png';
import { Link } from 'react-router-dom';
import InstallPWA from './InstallButton';

function BrandNavbar() {
	return (
		<>
			<Navbar className='justify-content-center bg-white'>
				<Link to='/home'>
					<Navbar.Brand>
						<img
							src={Logo}
							alt='mStore logo'
							width={200}
						/>
					</Navbar.Brand>
				</Link>
			</Navbar>

			<Navbar className='justify-content-center'>
				<InstallPWA />
			</Navbar>
		</>
	);
}

export default BrandNavbar;
