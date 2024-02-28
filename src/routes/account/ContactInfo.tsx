import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TProfile } from '../../app/auth/profile';
import {
	TContactInfo,
	deleteContact,
	getContactsData,
} from '../../controllers/contact';
import { useEffect, useState } from 'react';
import { fetchProfile } from '../../controllers/profile';
import Widget from '../../components/Widget';
import { Col, Container, Row } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import ContactInfoCard from '../../components/ContactInfoCard';

function ContactInfo() {
	const { profileId } = useParams();
	const dispatch = useAppDispatch();
	const profile: TProfile | null = useAppSelector(
		(state) => state.profile,
	);
	const [contactInfo, setContactInfo] = useState<
		(TContactInfo | null)[]
	>([]);

	const handleDelete = async (contactId: string) => {
		try {
			await deleteContact(profileId as string, contactId);
			setContactInfo((prevContacts) => {
				return prevContacts?.filter(
					(contact) =>
						contact?._id !== contactId && contact,
				);
			});
		} catch (e: any) {
			throw new Error(e.message);
		}
	};

	useEffect(() => {
		dispatch(fetchProfile(profileId as string));
		const getContacts = async () => {
			const contactsArray = await getContactsData(
				profileId as string,
			);
			setContactInfo(contactsArray);
		};
		getContacts();
	}, [dispatch, profileId]);

	return (
		<Container>
			<main dir='rtl'>
				<Row>
					{contactInfo &&
						contactInfo?.map((contact, index) => (
							<ContactInfoCard
								key={index}
								index={index}
								profileId={profile?._id}
								contact={contact}
								handleDelete={handleDelete}
							/>
						))}
					<Col xs={12} sm={6} lg={3} xl={2}>
						<Widget
							widgetTitle={<BsPlus />}
							href={`/account/profile/${profileId}/contact-info/new-contact`}
						/>
					</Col>
				</Row>
			</main>
		</Container>
	);
}

export default ContactInfo;
