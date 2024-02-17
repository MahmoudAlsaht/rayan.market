import { useAppSelector } from '../../app/hooks';
import { TCart } from '../../app/store/cart';
import CartProductCard from '../CartProductCard';

function CartSummary() {
	const cart: TCart | null = useAppSelector(
		(state) => state.cart,
	);

	return (
		<>
			<div className='text-muted'>
				Total : {cart?.totalPrice.toFixed(2)} JOD
			</div>
			{cart?.products?.map((product) => (
				<CartProductCard
					type='cartSummary'
					key={product?._id}
					product={product}
				/>
			))}
		</>
	);
}

export default CartSummary;
