import { memo, useState } from 'react';
import Information from '../../components/checkoutComponents/Information';
import { Container } from '@mui/material';

const Checkout = memo(() => {
	const [checkoutStep, setCheckoutStep] =
		useState('information');

	return (
		<Container>
			{checkoutStep === 'information' && (
				<Information handleStep={setCheckoutStep} />
			)}
		</Container>
	);
});

export default Checkout;
