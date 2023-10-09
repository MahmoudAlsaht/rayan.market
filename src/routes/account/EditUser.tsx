import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProfile } from '../../controllers/profile';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IUser, fetchUser } from '../../controllers/user';
import { Container } from 'react-bootstrap';
import UploadImageForm from '../../components/UploadImageForm';
import UpdatePasswordForm from '../../components/UpdatePasswordForm';
import UpdateUserInfoForm from '../../components/UpdateUserInfoForm';

function EditUser() {
	const profileOwner: IUser | any = useAppSelector(
		(state) => state.user,
	);

	const { profileId } = useParams();
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	if (profileOwner == null) navigate('/');

	useEffect(() => {
		dispatch(fetchProfile(profileId as string));
		dispatch(fetchUser());
	}, [dispatch, profileId]);

	return (
		<Container className='bg-white mt-2 p-5 border rounded shadow'>
			<UploadImageForm profileOwner={profileOwner} />

			<UpdateUserInfoForm profileOwner={profileOwner} />

			<UpdatePasswordForm profileOwner={profileOwner} />
		</Container>
	);
}

export default EditUser;
