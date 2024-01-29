import { Outlet, useNavigate } from 'react-router-dom';
import AccountNavbar from '../components/AccountNavbar';
import { useEffect } from 'react';
import { isAuthenticated } from '../utils';

function AccountLayout() {
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated()) navigate('/home');
	}, [navigate]);

	return (
		<>
			<AccountNavbar />
			<Outlet />
		</>
	);
}

export default AccountLayout;
