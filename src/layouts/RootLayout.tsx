import { Outlet } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import FloatingButton from '../components/FloatingButton';
import { BsCart } from 'react-icons/bs';

function RootLayout() {
	const handleClickCart = () => {};

	return (
		<>
			<MainNavbar />
			<Outlet />
			<FloatingButton
				icon={
					<BsCart className='floatingButtonIcon text-white' />
				}
				handleClickFn={handleClickCart}
			/>
		</>
	);
}

export default RootLayout;
