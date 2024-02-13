import { memo, useState } from 'react';
import { Container } from 'react-bootstrap';
import Information from '../../components/checkoutComponents/Information';
import Payment from '../../components/checkoutComponents/Payment';
import '../../assets/styles/CheckoutStyle.css';

const Checkout = memo(() => {
	const [checkoutStep, setCheckoutStep] =
		useState('information');

	return (
		<Container fluid>
			{checkoutStep === 'information' ? (
				<Information handleStep={setCheckoutStep} />
			) : (
				checkoutStep === 'payment' && (
					<Payment handleStep={setCheckoutStep} />
				)
			)}
		</Container>
	);
});

export default Checkout;
