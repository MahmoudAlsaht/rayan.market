import { useAppDispatch, useAppSelector } from '../app/hooks';
import { IUser, fetchUser, logOut } from '../controllers/user';
import { useNavigate } from 'react-router-dom';

function Home() {
	const dispatch = useAppDispatch();
	const user: IUser | any = useAppSelector(
		(state) => state.user,
	);
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logOut();
		dispatch(fetchUser());
		navigate('/');
	};

	return (
		<>
			<h1 className='text-danger'>
				{user !== null ? user.displayName : ''}
			</h1>
			<button onClick={() => dispatch(fetchUser())}>
				Get User
			</button>
			<div>
				<button onClick={handleLogout}>Logout</button>
			</div>
		</>
	);
}

export default Home;
