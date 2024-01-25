import { Outlet, useNavigate } from 'react-router-dom';
import AccountNavbar from '../components/AccountNavbar';
import { useEffect } from 'react';
import { getCookies } from '../utils';

function AccountLayout() {
	const user = getCookies('user');

	const navigate = useNavigate();

	useEffect(() => {
		if (!user || user?.username === 'anonymous')
			navigate('/');
	}, [navigate, user]);

	return (
		<>
			<AccountNavbar />
			<Outlet />
		</>
	);
}

export default AccountLayout;
