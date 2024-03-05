import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TUser } from '../../app/auth/auth';
import { useEffect, useState } from 'react';
import { fetchUser } from '../../controllers/user';
import AnonymousUserForm from '../forms/AnonymousUserForm';
import ChooseContactAddress from './ChooseContactAddress';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import {
	TContactInfo,
	getContactsData,
} from '../../controllers/contact';
import { Divider, Typography } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

function Information({
	handleStep,
}: {
	handleStep: (step: string) => void;
}) {
	const dispatch = useAppDispatch();

	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);

	const [contacts, setContacts] =
		useState<(TContactInfo | null)[]>();

	useEffect(() => {
		dispatch(fetchUser());
		if (user?.profile) {
			const getContacts = async () => {
				const contactsArray = await getContactsData(
					user?.profile as string,
				);
				setContacts(contactsArray);
			};
			getContacts();
		}
	}, [dispatch, user?.profile]);

	return (
		<div dir='rtl'>
			<Breadcrumbs
				separator={
					<NavigateBeforeIcon fontSize='small' />
				}
				sx={{ my: 5 }}
			>
				<Typography>
					<Link to='/cart'>السلة</Link>
				</Typography>
				<Typography
					sx={{ color: 'primary.main' }}
					onClick={() => handleStep('information')}
				>
					معلومات الاتصال
				</Typography>
			</Breadcrumbs>

			<Divider sx={{ mb: 5 }} />

			{user.username === 'anonymous' ? (
				<div>
					<Typography sx={{ mb: 5 }}>
						هل ترغب تسجيل الدخول؟{' '}
						<Link
							to='/auth/signin'
							style={{ color: 'skyblue' }}
						>
							تسجيل الدخول
						</Link>
					</Typography>

					<AnonymousUserForm />
				</div>
			) : (
				<ChooseContactAddress
					contacts={contacts!}
					user={user}
				/>
			)}
		</div>
	);
}

export default Information;
