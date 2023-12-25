import {
	Breadcrumb,
	Card,
	Col,
	Form,
	Row,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { TProfile } from '../../app/auth/profile';
import { getContactsData } from '../../controllers/contact';
import AnonymousUserForm from '../forms/AnonymousUserForm';
import ChooseContactAddress from './ChooseContactAddress';
import { BsPlus } from 'react-icons/bs';

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

			{!profile ? (
				<div>
					<h3 className='m-3'>Contact</h3>
					<AnonymousUserForm
						isLoading={isLoading}
						setIsLoading={setIsLoading}
						contact={undefined}
						handleStep={handleStep}
					/>
				</div>
			) : (
				<Row>
					<Col xs={12}>
						<Form>
							{contactInfo?.map(
								(contact, index) => (
									<ChooseContactAddress
										contact={contact}
										profile={profile}
										key={contact?.id}
										index={index}
									/>
								),
							)}
						</Form>
					</Col>
					<Col xs={12}>
						<Card style={{ width: '30%' }}>
							<Card.Body>
								<a
									href={`/account/profile/${profile?.id}/contact-info/new-contact`}
								>
									<BsPlus
										style={{
											fontSize: '100px',
											cursor: 'pointer',
										}}
									/>
								</a>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			)}
		</Col>
	);
}

export default ContactInformation;
