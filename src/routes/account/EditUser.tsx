import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProfile } from '../../controllers/profile';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IUser, fetchUser } from '../../controllers/user';
import { Container } from 'react-bootstrap';
import UploadImageForm from '../../components/forms/UploadImageForm';
import UpdatePasswordForm from '../../components/forms/UpdatePasswordForm';
import UpdateUserInfoForm from '../../components/forms/UpdateUserInfoForm';
import DeleteUser from '../../components/forms/DeleteUser';

function EditUser() {
	const profileOwner: IUser | any = useAppSelector(
		(state) => state.user,
	);

	const [isLoading, setIsLoading] = useState(false);

	const { profileId } = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchProfile(profileId as string));
		dispatch(fetchUser());
	}, [dispatch, profileId]);

	return (
		<Container className='bg-white mt-2 p-5 border rounded shadow'>
			<UploadImageForm
				profileOwner={profileOwner}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			/>

			<UpdateUserInfoForm
				profileOwner={profileOwner}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			/>

			<UpdatePasswordForm
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			/>

			<DeleteUser
				profileId={profileId as string}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			/>
		</Container>
	);
}

export default EditUser;
