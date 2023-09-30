import { Outlet } from 'react-router-dom';
import AccountNavbar from '../components/AccountNavbar';

function AccountLayout() {
	return (
		<>
			<AccountNavbar />
			<Outlet />
		</>
	);
}

export default AccountLayout;
