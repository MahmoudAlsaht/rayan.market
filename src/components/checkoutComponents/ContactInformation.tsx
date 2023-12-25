import { Breadcrumb, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { TProfile } from '../../app/auth/profile';
import { getContactsData } from '../../controllers/contact';
import AnonymousUserForm from '../forms/AnonymousUserForm';

function ContactInformation({
	handleStep,
	profile,
}: {
	handleStep: (step: string) => void;
	profile: TProfile | null;
}) {
	const [contactInfo, setContactInfo] =
		useState<(DocumentData | undefined)[]>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (profile) {
			const getContacts = async () => {
				const contactsArray = await getContactsData(
					profile?.id as string,
				);
				setContactInfo(contactsArray);
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

			{contactInfo ? (
				contactInfo[0]?.id
			) : (
				<div>
					<h3 className='mt-3 mb-2'>Contact</h3>
					<AnonymousUserForm
						isLoading={isLoading}
						setIsLoading={setIsLoading}
						contact={undefined}
						handleStep={handleStep}
					/>
				</div>
			)}
		</Col>
	);
}

export default ContactInformation;
