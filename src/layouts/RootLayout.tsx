import { Outlet } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';

function RootLayout() {
	return (
		<>
			<MainNavbar />
			<Outlet />
		</>
	);
}

export default RootLayout;
