import { Card, Form } from 'react-bootstrap';
import { TProfile } from '../../app/auth/profile';
import { DocumentData } from 'firebase/firestore';

type ChooseContactAddressProps = {
	contact: (DocumentData | undefined) | undefined;
	profile: TProfile | null;
	index: number;
};

function ChooseContactAddress({
	contact,
	profile,
	index,
}: ChooseContactAddressProps) {
	return (
		<Card>
			<Card.Header>
				<Card.Title>
					{contact?.address?.city ||
						`Address - ${index + 1}`}
				</Card.Title>
			</Card.Header>
			<Card.Body>
				<Form.Check
					type='radio'
					label={
						`${contact?.address?.street} - ${contact?.phoneNumber}` ||
						`Address - ${index + 1}`
					}
					name='defaultAddress'
				/>
			</Card.Body>
			<Card.Footer>
				<a
					href={`/account/profile/${profile?.id}/contact-info/${contact?.id}`}
				>
					Edit
				</a>
			</Card.Footer>
		</Card>
	);
}

export default ChooseContactAddress;
