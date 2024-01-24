import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TProfile } from '../../app/auth/profile';
import {
	TContactInfo,
	getContactsData,
} from '../../controllers/contact';
import { useEffect, useState } from 'react';
import { fetchProfile } from '../../controllers/profile';
import Widget from '../../components/dashboardComponents/Widget';
import { Col, Container, Row } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';

function ContactInfo() {
	const { profileId } = useParams();
	const dispatch = useAppDispatch();
	const profile: TProfile | null = useAppSelector(
		(state) => state.profile,
	);
	const [contactInfo, setContactInfo] = useState<
		TContactInfo[] | null
	>(null);

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
			<Row>
				{contactInfo?.map((contact, index) => (
					<Col
						xs={12}
						sm={6}
						lg={4}
						xl={3}
						key={index}
					>
						<Widget
							widgetTitle={`Address - ${
								index + 1
							}`}
							href={`/account/profile/${profile?.id}/contact-info/${contact?.id}`}
						/>
					</Col>
				))}
				<Col xs={12} sm={6} lg={3} xl={2}>
					<Widget
						widgetTitle={<BsPlus />}
						href={`/account/profile/${profile?.id}/contact-info/new-contact`}
					/>
				</Col>
			</Row>
		</Container>
	);
}

export default ContactInfo;
