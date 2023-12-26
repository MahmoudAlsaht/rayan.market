import { Breadcrumb, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { TProfile } from '../../app/auth/profile';
import { getContactsData } from '../../controllers/contact';
import AnonymousUserForm from '../forms/AnonymousUserForm';
import ChooseContactAddress from './ChooseContactAddress';

function ContactInformation({
	handleStep,
	profile,
}: {
	handleStep: (step: string) => void;
	profile: TProfile | null;
}) {
	const [contacts, setContacts] =
		useState<(DocumentData | undefined)[]>();

	useEffect(() => {
		if (profile) {
			const getContacts = async () => {
				const contactsArray = await getContactsData(
					profile?.id as string,
				);
				setContacts(contactsArray);
			};
			getContacts();
		}
	}, [profile]);

	return (
		<Col xs={12} md={6} className='checkoutInformation'>
			<h1 className='logo mb-5'>
				<a href='/'>mStore</a>
			</h1>
			<Breadcrumb className='mb-5'>
				<Breadcrumb.Item
					className='text-info'
					href='/cart'
				>
					Cart
				</Breadcrumb.Item>
				<Breadcrumb.Item
					className='text-info'
					active
					onClick={() => handleStep('information')}
				>
					Information
				</Breadcrumb.Item>
			</Breadcrumb>
			<hr />
			{!profile && (
				<div>
					<small>
						Do You want to sign in?{' '}
						<a href='/auth/signin'>Signin</a>
					</small>
				</div>
			)}

			{!profile ? (
				<div>
					<h3 className='m-3'>Contact</h3>
					<AnonymousUserForm
						contact={undefined}
						handleStep={handleStep}
					/>
				</div>
			) : (
				<ChooseContactAddress
					contacts={contacts}
					profile={profile}
					handleStep={handleStep}
				/>
			)}
		</Col>
	);
}

export default ContactInformation;
