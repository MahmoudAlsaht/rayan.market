import { Outlet } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import BrandNavbar from '../components/BrandNavbar';
import AppFooter from '../components/AppFooter';

function CheckoutLayout() {
	return (
		<>
			<BrandNavbar />
			<MainNavbar />
			<Outlet />
			<AppFooter />
		</>
	);
}

export default CheckoutLayout;
