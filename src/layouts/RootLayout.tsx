import { Outlet } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import CartFloatingButton from '../components/CartFloatingButton';
import { BsCart } from 'react-icons/bs';
import CategoryNavbar from '../components/CategoryNavbar';
import Cart from '../components/Cart';
import { useState } from 'react';
import BrandNavbar from '../components/BrandNavbar';
import { TCart } from '../app/store/cart';
import { useAppSelector } from '../app/hooks';

function RootLayout() {
	const [show, setShow] = useState(false);
	const [showDropDown, setShowDropDown] = useState(false);
	const cart: TCart | null = useAppSelector(
		(state) => state.cart,
	);

	const handleClickCart = () => setShow(!show);

	return (
		<>
			<BrandNavbar />
			<MainNavbar
				setIsDropDownOpen={setShowDropDown}
				isDropDownOpened={showDropDown}
			/>
			<CategoryNavbar isDropDownOpened={showDropDown} />
			<Outlet />

			<div>
				{cart.products && cart?.products?.length > 0 && (
					<CartFloatingButton
						icon={
							<BsCart className='floatingButtonIcon text-white' />
						}
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
