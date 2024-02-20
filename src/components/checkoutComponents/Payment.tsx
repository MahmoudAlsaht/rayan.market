import {
	Breadcrumb,
	Button,
	Card,
	Col,
	Container,
	Form,
	Row,
} from 'react-bootstrap';
import { TCart, emptyTheCart } from '../../app/store/cart';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ChangeEvent, useEffect, useState } from 'react';
// import PaymentButton from './PaymentButton';
import { createAnOrder } from '../../controllers/order';
import { Link } from 'react-router-dom';
import { TUser } from '../../app/auth/auth';
import { fetchUser } from '../../controllers/user';

function Payment({
	handleStep,
}: {
	handleStep: (step: string) => void;
}) {
	const cart: TCart | null = useAppSelector(
		(state) => state.cart,
	);
	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);

	const dispatch = useAppDispatch();

	const [paymentMethod, setPaymentMethod] = useState<string>();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPaymentMethod(e.target.value);
	};

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	const handleClick = async () => {
		if (paymentMethod === 'cashOnDelivery') {
			dispatch(createAnOrder({ cart, user }));
			dispatch(emptyTheCart());
			location.pathname = '/home';
		} else {
			return;
		}
	};

	return (
		<Container className='mt-5 d-flex flex-column align-items-center'>
			<Breadcrumb>
				<Breadcrumb.Item>
					<Link to='/cart' className='text-dark'>
						Cart
					</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item
					onClick={() => handleStep('information')}
				>
					<Link to='#' className='text-dark'>
						Contact &amp; shipping
					</Link>
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
								label='الدفع عند الإستلام'
								name='paymentMethod'
								value='cashOnDelivery'
								onChange={handleChange}
							/>
						</Card.Body>
					</Card>
				</Col>

				{/* <Col xs={12}>
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
				</Col> */}

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
						تأكيد الطلب
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default Payment;
