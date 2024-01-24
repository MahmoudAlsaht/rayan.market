import { Outlet } from 'react-router-dom';
import AccountNavbar from '../components/AccountNavbar';
import BrandNavbar from '../components/BrandNavbar';

function AccountLayout() {
	return (
		<>
			<BrandNavbar />
			<AccountNavbar />
			<Outlet />
		</>
	);
}

export default AccountLayout;
