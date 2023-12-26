import { Breadcrumb, Button } from 'react-bootstrap';
import { TCart } from '../../app/store/cart';
import { useAppSelector } from '../../app/hooks';

function Payment({
	handleStep,
}: {
	handleStep: (step: string) => void;
}) {
	const cart: TCart | null = useAppSelector(
		(state) => state.cart,
	);

	return (
		<>
			<Breadcrumb className='mb-5'>
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
			{cart?.userId}
			<br />
			{cart?.contactId}
			<Button
				className='float-end'
				// onClick={}
			>
				Proceed to Payment
			</Button>
		</>
	);
}

export default Payment;
