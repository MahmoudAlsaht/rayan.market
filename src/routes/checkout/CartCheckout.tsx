import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { TCart } from '../../app/store/cart';
import '../../assets/styles/CartStyle.css';
import CartProductCard from '../../components/CartProductCard';
import { checkIfProductIsAvailable } from '../../controllers/order';

function CartCheckout() {
	const cart: TCart = useAppSelector((state) => state.cart);

	const [isAvailable, setIsAvailable] = useState(true);

	useEffect(() => {
		setIsAvailable(
			checkIfProductIsAvailable(cart?.products),
		);
	}, [cart?.products]);

	return (
		<div className='m-5'>
			{cart?.products?.map((product) => (
				<CartProductCard
					key={product?.id}
					product={product}
				/>
			))}
			<div className='totalPrice text-muted'>
				<a
					href={isAvailable ? '/checkout' : '#'}
					className={`float-end btn ${
						isAvailable
							? 'btn-outline-primary'
							: 'btn-secondary'
					}`}
					style={{
						cursor: isAvailable
							? 'pointer'
							: 'unset',
					}}
				>
					Add Your Info
				</a>
			</div>

			{!isAvailable && (
				<div className='text-danger'>
					There are some products in cart not available
					check the stock to proceed!
				</div>
			)}
		</div>
	);
}

export default CartCheckout;
