import { useAppSelector } from '../../app/hooks';
import { TCart, TCartProduct } from '../../app/store/cart';
import { sumTotalPrice } from '../../utils';
import { useEffect, useState } from 'react';
import '../../assets/styles/CartStyle.css';
import CartProductCard from '../CartProductCard';
import { Breadcrumb, Button } from 'react-bootstrap';

function CartCheckout({
	handleStep,
}: {
	handleStep: (step: string) => void;
}) {
	const cart: TCart = useAppSelector((state) => state.cart);
	const [totalCartPrice, setTotalCartPrice] = useState(0);

	useEffect(() => {
		setTotalCartPrice(
			sumTotalPrice(cart?.products as TCartProduct[]),
		);
	}, [cart?.products]);

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
			</Breadcrumb>
			{cart?.products?.map((product) => (
				<CartProductCard
					key={product?.id}
					product={product}
				/>
			))}
			<div className='totalPrice text-muted'>
				Total Cart Price: {totalCartPrice}
				<Button
					className='float-end'
					onClick={() => handleStep('contact')}
				>
					Contact &amp; Shipping
				</Button>
			</div>
		</>
	);
}

export default CartCheckout;
