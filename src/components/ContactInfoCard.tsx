import { Button, Col } from 'react-bootstrap';
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
			throw new Error(e.message);
		}
	};

	return (
		<Col xs={12} sm={6} lg={4} xl={3}>
			<Widget
				widgetTitle={`Address - ${index + 1}`}
				href={`/account/profile/${profileId}/contact-info/${contact?._id}`}
				className='mb-0'
			/>
			<Button
				onClick={handleClick}
				variant='outline-danger'
			>
				Delete
			</Button>
		</Col>
	);
}

export default ContactInfoCard;
