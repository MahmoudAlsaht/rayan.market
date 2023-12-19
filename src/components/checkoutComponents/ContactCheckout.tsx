import { Breadcrumb, Button } from 'react-bootstrap';

function ContactCheckout({
	handleStep,
}: {
	handleStep: (step: string) => void;
}) {
	return (
		<>
			<Breadcrumb className='mb-5'>
				<Breadcrumb.Item
					className='text-info'
					onClick={() => handleStep('cart')}
				>
					Cart
				</Breadcrumb.Item>
				<Breadcrumb.Item
					className='text-info'
					active
					onClick={() => handleStep('contact')}
				>
					Contact &amp; shipping
				</Breadcrumb.Item>
			</Breadcrumb>
			Payment{' '}
			<Button
				className='float-end'
				onClick={() => handleStep('payment')}
			>
				Payment
			</Button>
		</>
	);
}

export default ContactCheckout;
