import {
	Breadcrumb,
	Button,
	Card,
	Col,
	Container,
	Form,
	Row,
} from 'react-bootstrap';
import { TCart } from '../../app/store/cart';
import { useAppSelector } from '../../app/hooks';
import { ChangeEvent, useState } from 'react';
import PaymentButton from './PaymentButton';
import { createAnOrder } from '../../controllers/order';

function Payment({
	handleStep,
}: {
	handleStep: (step: string) => void;
}) {
	const cart: TCart | null = useAppSelector(
		(state) => state.cart,
	);

	const [paymentMethod, setPaymentMethod] = useState<string>();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPaymentMethod(e.target.value);
	};

	const handleClick = async () => {
		if (paymentMethod === 'cashOnDelivery') {
			await createAnOrder(cart);
		} else {
			return;
		}
	};

	return (
		<Container className='mt-5 d-flex flex-column align-items-center'>
			<Breadcrumb>
				<Breadcrumb.Item
					className='text-info'
					href='/cart'
				>
					Cart
				</Breadcrumb.Item>
				<Breadcrumb.Item
					className='text-info'
					onClick={() => handleStep('information')}
				>
					Contact &amp; shipping
				</Breadcrumb.Item>
				<Breadcrumb.Item
					className='text-info'
					active
					onClick={() => handleStep('payment')}
				>
					Payment
				</Breadcrumb.Item>
			</Breadcrumb>

			<Row>
				<Col xs={12}>
					<Card className='mb-2'>
						<Card.Body>
							<Form.Check
								type='radio'
								label='Cash on delivery'
								name='paymentMethod'
								value='cashOnDelivery'
								onChange={handleChange}
							/>
						</Card.Body>
					</Card>
				</Col>

				<Col xs={12}>
					<Card className='mb-2'>
						<Card.Body>
							<p>
								<small className='text-danger'>
									This method isn't working
									now, eventually it is just a
									demo app!
								</small>
							</p>
							<Form.Check
								type='radio'
								label='Pay Now'
								name='paymentMethod'
								value='payNow'
								onChange={handleChange}
							/>
						</Card.Body>
					</Card>
					{paymentMethod === 'payNow' && (
						<PaymentButton />
					)}
				</Col>

				<Col xs={12}>
					<Button
						className='w-100'
						variant={
							paymentMethod === 'payNow' ||
							paymentMethod == null
								? 'secondary'
								: 'outline-info'
						}
						onClick={handleClick}
						disabled={
							paymentMethod === 'payNow' ||
							paymentMethod == null
						}
					>
						Place The Order
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default Payment;
