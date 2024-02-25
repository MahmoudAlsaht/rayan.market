import { Outlet } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import AppFooter from '../components/AppFooter';

function CheckoutLayout() {
	return (
		<>
			<MainNavbar />
			<Outlet />
			<AppFooter />
		</>
	);
}

export default CheckoutLayout;
