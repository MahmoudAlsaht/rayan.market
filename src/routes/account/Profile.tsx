import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProfile } from '../../controllers/profile';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IProfile } from '../../app/auth/profile';

function Profile() {
	const dispatch = useAppDispatch();
	const profile: IProfile | any = useAppSelector(
		(state) => state.profile,
	);
	const { profileId } = useParams();

	useEffect(() => {
		dispatch(fetchProfile(profileId as string));
	}, [dispatch, profileId]);

	return <div>{profile?.uid}</div>;
}

export default Profile;
