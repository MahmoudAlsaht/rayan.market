import { Outlet } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import FloatingButton from '../components/FloatingButton';
import { BsPlusLg } from 'react-icons/bs';
import { useState } from 'react';
import AddCategoryForm from '../components/forms/AddCategoryForm';

function RootLayout() {
	const [showAddCategoryForm, setShowAddCategoryForm] =
		useState(false);

	const handleClickAddCat = () => {
		setShowAddCategoryForm(!showAddCategoryForm);
	};

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

			<AddCategoryForm
				show={showAddCategoryForm}
				handleClose={handleClickAddCat}
			/>
		</>
	);
}

export default RootLayout;
