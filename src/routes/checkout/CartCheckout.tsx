import { memo, useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { TCart, TCartProduct } from '../../app/store/cart';
import CartProductCard from '../../components/CartProductCard';
import { checkIfProductIsAvailable } from '../../controllers/order';
import { useNavigate } from 'react-router-dom';
import { checkEveryProductCounter } from '../../controllers/cart';
import { Button, Container, Typography } from '@mui/material';

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
		<main dir='rtl'>
			<Container
				sx={{
					mt: { sm: 20 },
					display: { xs: 'flex', sm: 'block' },
					flexDirection: { xs: 'column', sm: 'unset' },
					alignItems: { xs: 'center', sm: 'unset' },
				}}
			>
				{cart?.products?.map((product) => (
					<CartProductCard
						key={product?._id}
						product={product}
					/>
				))}
				<div dir='rtl'>
					<Button
						variant='outlined'
						onClick={() =>
							navigate(
								isCountersAboveZero &&
									isAvailable
									? '/checkout'
									: '#',
							)
						}
						sx={{
							color: 'primary.main',
							width: { xs: '200%', sm: '30%' },
						}}
						disabled={
							!isCountersAboveZero || !isAvailable
						}
					>
						ادخل بياناتك
					</Button>
				</div>

				{!isAvailable && (
					<Typography sx={{ color: 'error.main' }}>
						يرجى أن تقوم بتعديل سلتك هناك بعض
						المنتجات لم تعد متوفرة
					</Typography>
				)}
			</Container>
		</main>
	);
});

export default CartCheckout;
