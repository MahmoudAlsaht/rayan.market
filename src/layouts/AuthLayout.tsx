import { Outlet } from 'react-router-dom';
import AuthNavbar from '../components/AuthNavbar';
import AppFooter from '../components/AppFooter';

export default function AuthLayout() {
	return (
		<>
			<AuthNavbar />
			<Outlet />
			<AppFooter />
		</>
	);
}
