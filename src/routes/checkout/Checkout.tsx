import { useState } from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';
import CartCheckout from '../../components/checkoutComponents/CartCheckout';
import ContactCheckout from '../../components/checkoutComponents/ContactCheckout';
import Payment from '../../components/checkoutComponents/Payment';

function Checkout() {
	const [checkoutStep, setCheckoutStep] = useState('cart');

	return (
		<Container>
			<Breadcrumb className='mb-5'>
				<Breadcrumb.Item
					className='text-info'
					active={checkoutStep === 'cart'}
					onClick={() => setCheckoutStep('cart')}
				>
					Cart
				</Breadcrumb.Item>
				<Breadcrumb.Item
					className='text-info'
					active={checkoutStep === 'contact'}
					onClick={() => setCheckoutStep('contact')}
				>
					Contact &amp; shipping
				</Breadcrumb.Item>
				<Breadcrumb.Item
					className='text-info'
					active={checkoutStep === 'payment'}
					onClick={() => setCheckoutStep('payment')}
				>
					Payment
				</Breadcrumb.Item>
			</Breadcrumb>
			{checkoutStep === 'contact' ? (
				<ContactCheckout />
			) : checkoutStep === 'payment' ? (
				<Payment />
			) : (
				<div>
					<CartCheckout handleStep={setCheckoutStep} />
				</div>
			)}
		</Container>
	);
}

export default Checkout;
