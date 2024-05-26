import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TProfile } from '../../app/auth/profile';
import AddIcon from '@mui/icons-material/Add';
import {
	TContactInfo,
	deleteContact,
	getContactsData,
} from '../../controllers/contact';
import { useEffect, useState } from 'react';
import { fetchProfile } from '../../controllers/profile';
import ContactInfoCard from '../../components/ContactInfoCard';
import {
	Card,
	CardContent,
	Container,
	Grid,
} from '@mui/material';

function ContactInfo() {
	const { profileId } = useParams();
	const dispatch = useAppDispatch();
	const profile: TProfile | null = useAppSelector(
		(state) => state.profile,
	);
	const navigate = useNavigate();

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
			throw new Error('something went wrong');
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
		<Container sx={{ m: { sm: 5 } }}>
			<main dir='rtl'>
				<Grid container spacing={2}>
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
					<Grid xs={12} sm={6} lg={3} xl={2}>
						<Card
							sx={{
								mt: 2,
								width: { xs: '100%', sm: 130 },
								height: 130,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
							}}
							onClick={() =>
								navigate(
									`/account/profile/${profileId}/contact-info/new-contact`,
								)
							}
						>
							<CardContent>
								<AddIcon
									sx={{
										fontSize: 60,
										cursor: 'pointer',
									}}
								/>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</main>
		</Container>
	);
}

export default ContactInfo;
