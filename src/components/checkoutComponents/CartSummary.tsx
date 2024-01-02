import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { TCart, TCartProduct } from '../../app/store/cart';
import CartProductCard from '../CartProductCard';
import { sumTotalPrice } from '../../utils';
import { Container } from 'react-bootstrap';

function CartSummary() {
	const cart: TCart | null = useAppSelector(
		(state) => state.cart,
	);
	const [totalCartPrice, setTotalCartPrice] = useState(0);

	useEffect(() => {
		setTotalCartPrice(
			sumTotalPrice(cart?.products as TCartProduct[]),
		);
	}, [cart?.products]);

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
				Total : {totalCartPrice} JOD
			</div>
		</Container>
	);
}

export default CartSummary;
