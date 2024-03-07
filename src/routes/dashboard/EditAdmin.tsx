import { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import UpdatePasswordForm from '../../components/forms/UpdatePasswordForm';
import UpdateUserInfoForm from '../../components/forms/UpdateUserInfoForm';
import { fetchProfile } from '../../controllers/profile';
import { TProfile } from '../../app/auth/profile';
import { Box, Container, Tab, Tabs } from '@mui/material';

function EditAdmin() {
	const profile: TProfile | null = useAppSelector(
		(state) => state.profile,
	);

	const [isLoading, setIsLoading] = useState(false);
	const [pageName, setPageName] = useState('personalInfo');

	const { profileId } = useParams();
	const dispatch = useAppDispatch();

	const handleChange = (
		event: SyntheticEvent,
		newValue: string,
	) => {
		setPageName(newValue);
	};

	useEffect(() => {
		dispatch(fetchProfile(profileId as string));
	}, [dispatch, profileId]);

	return (
		<Container sx={{ m: 5 }}>
			<div dir='rtl'>
				<Box
					sx={{
						borderBottom: 1,
						borderColor: 'divider',
					}}
				>
					<Tabs
						value={pageName}
						onChange={handleChange}
						variant='scrollable'
						scrollButtons='auto'
						aria-label='scrollable auto tabs example'
						sx={{ my: 5 }}
					>
						<Tab
							label='معلومات الحساب'
							value='personalInfo'
						/>

						<Tab
							label='كلمة المرور'
							value='updatePassword'
						/>
					</Tabs>
				</Box>

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
			</div>
		</Container>
	);
}

export default EditAdmin;
