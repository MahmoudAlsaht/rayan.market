import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TProfile } from '../../app/auth/profile';
import { getContactsData } from '../../controllers/contact';
import { useEffect, useState } from 'react';
import { fetchProfile } from '../../controllers/profile';
import Widget from '../../components/dashboardComponents/Widget';
import { Col, Row } from 'react-bootstrap';
import { DocumentData } from 'firebase/firestore';

function ContactInfo() {
	const { profileId } = useParams();
	const dispatch = useAppDispatch();
	const profile: TProfile | any = useAppSelector(
		(state) => state.profile,
	);
	const [contactInfo, setContactInfo] =
		useState<(DocumentData | undefined)[]>();

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
		<Row>
			{contactInfo?.map((contact, index) => (
				<Col xs={12} md={6} lg={4} key={index}>
					<Widget
						widgetTitle={`Address-${index + 1}`}
						href={`/account/profile/${profile?.id}/contact-info/${contact?.id}`}
					/>
				</Col>
			))}
		</Row>
	);
}

export default ContactInfo;
