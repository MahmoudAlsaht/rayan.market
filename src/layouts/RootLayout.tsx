import { Outlet } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import CartFloatingButton from '../components/CartFloatingButton';
import Cart from '../components/Cart';
import { useState } from 'react';
import { TCart } from '../app/store/cart';
import { useAppSelector } from '../app/hooks';
import AppFooter from '../components/AppFooter';

function RootLayout() {
	const [show, setShow] = useState(false);
	const cart: TCart | null = useAppSelector(
		(state) => state.cart,
	);

	const handleClickCart = () => setShow(!show);

	return (
		<>
			<MainNavbar />

			<Outlet />

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
