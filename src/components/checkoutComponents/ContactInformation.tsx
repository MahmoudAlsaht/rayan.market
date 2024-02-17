import { Breadcrumb, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { TProfile } from '../../app/auth/profile';
import {
	TContactInfo,
	getContactsData,
} from '../../controllers/contact';
import AnonymousUserForm from '../forms/AnonymousUserForm';
import ChooseContactAddress from './ChooseContactAddress';
import { Link } from 'react-router-dom';
import Logo from '../../rayan.marketLogo.png';

function ContactInformation({
	handleStep,
	profile,
}: {
	handleStep: (step: string) => void;
	profile: TProfile | null;
}) {
	const [contacts, setContacts] =
		useState<(TContactInfo | null)[]>();

	useEffect(() => {
		if (profile) {
			const getContacts = async () => {
				const contactsArray = await getContactsData(
					profile?._id as string,
				);
				setContacts(contactsArray);
			};
			getContacts();
		}
	}, [profile]);

	return (
		<Col xs={12} md={6} className='checkoutInformation'>
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

			{profile?._id === '' ? (
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
					profile={profile}
					handleStep={handleStep}
				/>
			)}
		</Col>
	);
}

export default ContactInformation;
