import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProfile } from '../../controllers/profile';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TProfile } from '../../app/auth/profile';
import { fetchUser } from '../../controllers/user';

function Profile() {
	const dispatch = useAppDispatch();

	const profile: TProfile | null = useAppSelector(
		(state) => state.profile,
	);
	const { profileId } = useParams();

	useEffect(() => {
		dispatch(fetchProfile(profileId as string));
		dispatch(fetchUser());
	}, [dispatch, profileId]);

	return <div>{profile?.id}</div>;
}

export default Profile;
