import { Outlet } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import CartFloatingButton from '../components/CartFloatingButton';
import Cart from '../components/Cart';
import { useState } from 'react';
import { TCart } from '../app/store/cart';
import { useAppSelector } from '../app/hooks';
import AppFooter from '../components/AppFooter';
import HomeMobile from '../components/mobileComponents/MobileNavigation';
import { Box } from '@mui/material';

function RootLayout() {
	const [show, setShow] = useState(false);
	const cart: TCart | null = useAppSelector(
		(state) => state.cart,
	);

	const handleClickCart = () => setShow(!show);

	return (
		<>
			<Box
				sx={{
					display: { xs: 'none', sm: 'block' },
				}}
			>
				<MainNavbar />
			</Box>

			<Outlet />

			<main dir='rtl'>
				<Box
					sx={{
						display: { sm: 'none' },
					}}
				>
					<HomeMobile />
				</Box>
			</main>

			<AppFooter />

			<div>
				{cart.products && cart?.products?.length > 0 && (
					<CartFloatingButton
						handleClickFn={handleClickCart}
						cartLength={cart?.products?.length}
					/>
				)}
				<Cart
					show={show}
					handleClose={handleClickCart}
				/>
			</div>
		</>
	);
}

export default RootLayout;
