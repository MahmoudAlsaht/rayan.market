import { Outlet } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import FloatingButton from '../components/FloatingButton';
import { BsPlusLg } from 'react-icons/bs';

function RootLayout() {
	const handleClickAddCat = () => {};
	return (
		<>
			<MainNavbar />
			<Outlet />

			<FloatingButton
				icon={
					<BsPlusLg className='floatingButtonIcon' />
				}
				handleClickFn={handleClickAddCat}
			/>
		</>
	);
}

export default RootLayout;
