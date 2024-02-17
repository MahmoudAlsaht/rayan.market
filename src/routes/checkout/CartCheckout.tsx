import { memo, useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { TCart, TCartProduct } from '../../app/store/cart';
import '../../assets/styles/CartStyle.css';
import CartProductCard from '../../components/CartProductCard';
import { checkIfProductIsAvailable } from '../../controllers/order';
import { Link, useNavigate } from 'react-router-dom';
import { checkEveryProductCounter } from '../../controllers/cart';
import { Col, Row } from 'react-bootstrap';

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
			navigate('/home');
		}
		setIsCountersAboveZero(
			checkEveryProductCounter(
				cart?.products as TCartProduct[],
			),
		);
	}, [cart?.products, checkIfCartIsEmpty, navigate]);

	return (
		<Row className=''>
			{cart?.products?.map((product) => (
				<Col xs={12} sm={6} md={4}>
					<CartProductCard
						key={product?._id}
						product={product}
					/>
				</Col>
			))}
			<div className='totalPrice text-muted mb-5'>
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
					يرجى أن تقوم بتعديل سلتك هناك بعض المنتجات لم
					تعد متوفرة
				</div>
			)}
		</Row>
	);
});

export default CartCheckout;
