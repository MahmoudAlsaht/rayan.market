import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Container } from 'react-bootstrap';
import UploadImageForm from '../../components/forms/UploadImageForm';
import UpdatePasswordForm from '../../components/forms/UpdatePasswordForm';
import UpdateUserInfoForm from '../../components/forms/UpdateUserInfoForm';
import DeleteUser from '../../components/forms/DeleteUser';
import { fetchProfile } from '../../controllers/profile';
import { TProfile } from '../../app/auth/profile';

function EditUser() {
	const profile: TProfile | null = useAppSelector(
		(state) => state.profile,
	);

	const [isLoading, setIsLoading] = useState(false);

	const { profileId } = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchProfile(profileId as string));
	}, [dispatch, profileId]);

	return (
		<Container className='bg-white mt-2 p-5 border rounded shadow'>
			<UploadImageForm
				profile={profile}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			/>

			<UpdateUserInfoForm
				user={profile?.user}
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
