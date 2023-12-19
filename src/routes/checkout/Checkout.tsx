import { useState } from 'react';
import { Container } from 'react-bootstrap';
import CartCheckout from '../../components/checkoutComponents/CartCheckout';
import ContactCheckout from '../../components/checkoutComponents/ContactCheckout';
import Payment from '../../components/checkoutComponents/Payment';

function Checkout() {
	const [checkoutStep, setCheckoutStep] = useState('cart');

	return (
		<Container>
			{checkoutStep === 'contact' ? (
				<ContactCheckout handleStep={setCheckoutStep} />
			) : checkoutStep === 'payment' ? (
				<Payment handleStep={setCheckoutStep} />
			) : (
				<div>
					<CartCheckout handleStep={setCheckoutStep} />
				</div>
			)}
		</Container>
	);
}

export default Checkout;
