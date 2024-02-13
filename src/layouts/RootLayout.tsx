import { Outlet } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import FloatingButton from '../components/FloatingButton';
import { BsCart } from 'react-icons/bs';
import CategoryNavbar from '../components/CategoryNavbar';
import Cart from '../components/Cart';
import { useState } from 'react';
import BrandNavbar from '../components/BrandNavbar';

function RootLayout() {
	const [show, setShow] = useState(false);

	const handleClickCart = () => setShow(!show);

	return (
		<>
			<BrandNavbar />
			<MainNavbar />
			<CategoryNavbar />
			<Outlet />

			<div>
				<FloatingButton
					icon={
						<BsCart className='floatingButtonIcon text-white' />
					}
					handleClickFn={handleClickCart}
				/>

				<Cart
					show={show}
					handleClose={handleClickCart}
				/>
			</div>
		</>
	);
}

export default RootLayout;
