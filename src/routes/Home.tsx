import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUser, logOut } from '../controllers/user';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';

function Home() {
	const dispatch = useAppDispatch();
	const user: Partial<User> | any = useAppSelector(
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
				{user !== null ? user.email : ''}
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
