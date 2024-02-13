import { memo, useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { TCart, TCartProduct } from '../../app/store/cart';
import '../../assets/styles/CartStyle.css';
import CartProductCard from '../../components/CartProductCard';
import { checkIfProductIsAvailable } from '../../controllers/order';
import { Link, useNavigate } from 'react-router-dom';
import { checkEveryProductCounter } from '../../controllers/cart';

const CartCheckout = memo(() => {
	const cart: TCart = useAppSelector((state) => state.cart);
	const navigate = useNavigate();

	const [isAvailable, setIsAvailable] = useState(true);
	const [isCountersAboveZero, setIsCountersAboveZero] =
		useState(true);

	const checkIfCartIsEmpty = cart.products!.length! > 0;

	useEffect(() => {
		setIsAvailable(
			checkIfProductIsAvailable(cart?.products),
		);
		if (!checkIfCartIsEmpty) {
			location.pathname = '/';
			navigate('/');
		}
		setIsCountersAboveZero(
			checkEveryProductCounter(
				cart?.products as TCartProduct[],
			),
		);
	}, [cart?.products, checkIfCartIsEmpty, navigate]);

	return (
		<div className='m-5'>
			{cart?.products?.map((product) => (
				<CartProductCard
					key={product?._id}
					product={product}
				/>
			))}
			<div className='totalPrice text-muted'>
				<Link
					to={
						isCountersAboveZero && isAvailable
							? '/checkout'
							: '#'
					}
					className={`float-end btn ${
						isCountersAboveZero && isAvailable
							? 'btn-outline-primary'
							: 'btn-secondary'
					}`}
					style={{
						cursor:
							isCountersAboveZero && isAvailable
								? 'pointer'
								: 'unset',
					}}
				>
					Add Your Info
				</Link>
			</div>

			{!isAvailable && (
				<div className='text-danger'>
					There are some products in cart not available
					check the stock to proceed!
				</div>
			)}
		</div>
	);
});

export default CartCheckout;
