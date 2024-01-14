import { Card, Col, Form, Row } from 'react-bootstrap';
import { TProfile } from '../../app/auth/profile';
import { DocumentData } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import LoadingButton from '../LoadingButton';
import { useAppDispatch } from '../../app/hooks';
import { addUserAndContactToCart } from '../../app/store/cart';

type ChooseContactAddressProps = {
	contacts: (DocumentData | undefined)[] | undefined;
	profile: TProfile | null;
	handleStep: (step: string) => void;
};

function ChooseContactAddress({
	contacts,
	profile,
	handleStep,
}: ChooseContactAddressProps) {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const [selectedAddress, setSelectedAddress] =
		useState<string>();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSelectedAddress(e.target.value);
	};

	const checkSelectedAddress = () =>
		selectedAddress != undefined && selectedAddress !== '';

	const handleSubmit = (e: FormEvent<Element> | undefined) => {
		e?.preventDefault();
		try {
			setIsLoading(true);
			dispatch(
				addUserAndContactToCart({
					userId: profile?.user as string,
					contactId: selectedAddress as string,
				}),
			);
			handleStep('payment');
			setIsLoading(false);
		} catch (e: any) {
			console.log(e.message);
		}
	};

	return (
		<Row>
			<Form>
				<h3 className='m-3'>Choose An Address</h3>
				<Col xs={12}>
					{contacts?.map((contact, index) => (
						<Card className='mb-2' key={contact?.id}>
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
									value={contact?.id}
									onChange={handleChange}
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
					))}
				</Col>
				<Col xs={12}>
					<Card className='text-center'>
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
				<LoadingButton
					className='mt-2'
					type='submit'
					body='Proceed to Payment'
					variant='primary'
					isLoading={isLoading}
					handleClick={handleSubmit}
					disabled={!checkSelectedAddress()}
				/>
			</Form>
		</Row>
	);
}

export default ChooseContactAddress;
