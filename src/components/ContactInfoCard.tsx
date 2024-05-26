import { Button, Grid } from '@mui/material';
import { TContactInfo } from '../controllers/contact';
import Widget from './Widget';

type ContactInfoCardProps = {
	profileId: string;
	contact: TContactInfo | null;
	index: number;
	handleDelete: (contactId: string) => void;
};

function ContactInfoCard({
	profileId,
	contact,
	index,
	handleDelete,
}: ContactInfoCardProps) {
	const handleClick = async () => {
		try {
			await handleDelete(contact?._id as string);
		} catch (e: any) {
			throw new Error('something went wrong');
		}
	};

	return (
		<>
			<Grid xs={8} sm={6} lg={4} xl={3}>
				<Widget
					widgetTitle={`العنوان - ${index + 1}`}
					href={`/account/profile/${profileId}/contact-info/${contact?._id}`}
				/>
			</Grid>
			<Grid xs={4} sm={12}>
				<Button
					onClick={handleClick}
					variant='outlined'
					color='error'
					sx={{ mt: 4, py: 5 }}
				>
					Delete
				</Button>
			</Grid>
		</>
	);
}

export default ContactInfoCard;
