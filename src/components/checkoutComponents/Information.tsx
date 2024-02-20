import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TUser } from '../../app/auth/auth';
import { useEffect, useState } from 'react';
import { fetchUser } from '../../controllers/user';
import { Breadcrumb } from 'react-bootstrap';
import AnonymousUserForm from '../forms/AnonymousUserForm';
import ChooseContactAddress from './ChooseContactAddress';
import { Link } from 'react-router-dom';
import Logo from '../../rayan.marketLogo.png';
import {
	TContactInfo,
	getContactsData,
} from '../../controllers/contact';

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
		<>
			<h1 className='logo mb-5'>
				<Link to='/home' className='text-info'>
					<img
						src={Logo}
						alt='Al Rayyan International Markets'
						width={90}
					/>
				</Link>
			</h1>
			<Breadcrumb className='mb-5'>
				<Breadcrumb.Item>
					<Link to='/cart' className='text-dark'>
						Cart
					</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item
					className='text-info'
					active
					onClick={() => handleStep('information')}
				>
					Contact &amp; shipping
				</Breadcrumb.Item>
			</Breadcrumb>
			<hr />

			{user.username === 'anonymous' ? (
				<div>
					<small>
						Do You want to sign in?{' '}
						<Link to='/auth/signin'>Signin</Link>
					</small>
					<h3 className='m-3'>Contact</h3>
					<AnonymousUserForm
						contact={undefined}
						handleStep={handleStep}
					/>
				</div>
			) : (
				<ChooseContactAddress
					contacts={contacts!}
					user={user}
					handleStep={handleStep}
				/>
			)}
		</>
	);
}

export default Information;
