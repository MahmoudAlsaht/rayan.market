import { Card, Col, Form, Row } from 'react-bootstrap';
import { ChangeEvent, FormEvent, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import LoadingButton from '../LoadingButton';
import { useAppDispatch } from '../../app/hooks';
import { addUserAndContactToCart } from '../../app/store/cart';
import { TContactInfo } from '../../controllers/contact';
import { Link } from 'react-router-dom';
import { TUser } from '../../app/auth/auth';

type ChooseContactAddressProps = {
	contacts: (TContactInfo | null)[];
	user: TUser | null;
	handleStep: (step: string) => void;
};

function ChooseContactAddress({
	contacts,
	user,
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
					userId: user?._id as string,
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
						<Card
							className='mb-2'
							key={contact?._id}
						>
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
										`${contact?.address?.street} - ${contact?.contactNumber}` ||
										`Address - ${index + 1}`
									}
									name='defaultAddress'
									value={contact?._id}
									onChange={handleChange}
								/>
							</Card.Body>
							<Card.Footer>
								<a
									className='text-info'
									href={`account/profile/${user?.profile}/contact-info/${contact?._id}`}
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
							<Link
								className='text-info'
								to={`/account/profile/${user?.profile}/contact-info/new-contact`}
							>
								<BsPlus
									style={{
										fontSize: '100px',
										cursor: 'pointer',
									}}
								/>
							</Link>
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
