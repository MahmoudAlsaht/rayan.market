import { Outlet, useNavigate } from 'react-router-dom';
import AccountNavbar from '../components/AccountNavbar';
import { useEffect } from 'react';
import { isAuthenticated } from '../utils';
import AppFooter from '../components/AppFooter';

function AccountLayout() {
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated()) navigate('/home');
	}, [navigate]);

	return (
		<>
			<AccountNavbar />
			<Outlet />
			<AppFooter />
		</>
	);
}

export default AccountLayout;
