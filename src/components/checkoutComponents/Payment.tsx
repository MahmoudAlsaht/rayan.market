import { Breadcrumb, Button } from 'react-bootstrap';

function Payment({
	handleStep,
}: {
	handleStep: (step: string) => void;
}) {
	return (
		<>
			<Breadcrumb className='mb-5'>
				<Breadcrumb.Item
					className='text-info'
					active
					onClick={() => handleStep('cart')}
				>
					Cart
				</Breadcrumb.Item>
				<Breadcrumb.Item
					className='text-info'
					onClick={() => handleStep('contact')}
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
			Payment
			<Button
				className='float-end'
				// onClick={}
			>
				Pay
			</Button>
		</>
	);
}

export default Payment;
