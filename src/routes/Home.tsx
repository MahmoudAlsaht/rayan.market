import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { IUser, fetchUser } from '../controllers/user';

function Home() {
	const dispatch = useAppDispatch();
	const user: IUser | any = useAppSelector(
		(state) => state.user,
	);

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	return (
		<>
			<h1 className='text-danger'>
				{user !== null ? user.username : ''}
			</h1>
		</>
	);
}

export default Home;
