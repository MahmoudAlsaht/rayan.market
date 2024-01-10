import { useAppSelector } from '../../app/hooks';
import { TCart } from '../../app/store/cart';
import CartProductCard from '../CartProductCard';
import { Container } from 'react-bootstrap';

function CartSummary() {
	const cart: TCart | null = useAppSelector(
		(state) => state.cart,
	);

	return (
		<Container className='mt-5'>
			{cart?.products?.map((product) => (
				<CartProductCard
					type='cartSummary'
					key={product?.id}
					product={product}
				/>
			))}
			<div className='totalPrice text-muted'>
				Total : {cart.totalPrice} JOD
			</div>
		</Container>
	);
}

export default CartSummary;
