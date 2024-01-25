import { Outlet, useNavigate } from 'react-router-dom';
import AccountNavbar from '../components/AccountNavbar';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect } from 'react';
import { fetchUser } from '../controllers/user';
import { TUser } from '../app/auth/auth';

function AccountLayout() {
	const user: TUser = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchUser());
		if (user.username === 'anonymous') navigate('/');
		console.log(user);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, user]);

	return (
		<>
			<AccountNavbar />
			<Outlet />
		</>
	);
}

export default AccountLayout;
