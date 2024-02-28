import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Container, Nav } from 'react-bootstrap';
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
	const [pageName, setPageName] = useState<string | null>(
		'personalInfo',
	);

	const { profileId } = useParams();
	const dispatch = useAppDispatch();

	const handleSelect = (selectedKey: string | null) => {
		setPageName(selectedKey);
	};

	useEffect(() => {
		dispatch(fetchProfile(profileId as string));
	}, [dispatch, profileId]);

	return (
		<Container className='bg-white mt-2 p-5 border rounded shadow'>
			<div dir='rtl'>
				<Nav
					variant='tabs'
					defaultActiveKey={pageName!}
					className='mb-5'
					onSelect={handleSelect}
				>
					<Nav.Item>
						<Nav.Link eventKey='personalInfo'>
							معلومات الحساب
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey='updatePassword'>
							كلمة المرور
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey='deleteAccount'>
							حذف الحساب
						</Nav.Link>
					</Nav.Item>
				</Nav>

				{pageName === 'personalInfo' && (
					<UpdateUserInfoForm
						user={profile?.user}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
					/>
				)}

				{pageName === 'updatePassword' && (
					<UpdatePasswordForm
						isLoading={isLoading}
						setIsLoading={setIsLoading}
					/>
				)}

				{pageName === 'deleteAccount' && (
					<DeleteUser
						profileId={profileId as string}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
					/>
				)}
			</div>
		</Container>
	);
}

export default EditUser;
