import { Navbar } from 'react-bootstrap';
import Logo from '../rayan.marketLogo.png';
import { Link } from 'react-router-dom';

function BrandNavbar() {
	return (
		<>
			<Navbar className='justify-content-center bg-white'>
				<Link to='/home'>
					<Navbar.Brand>
						<img
							src={Logo}
							alt='mStore logo'
							width={120}
							className=''
						/>
					</Navbar.Brand>
				</Link>
			</Navbar>
		</>
	);
}

export default BrandNavbar;
