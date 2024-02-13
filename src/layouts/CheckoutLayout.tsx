import { Outlet } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import BrandNavbar from '../components/BrandNavbar';

function CheckoutLayout() {
	return (
		<>
			<BrandNavbar />
			<MainNavbar />
			<Outlet />
		</>
	);
}

export default CheckoutLayout;
