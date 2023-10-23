import { Outlet } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import FloatingButton from '../components/FloatingButton';
import { BsPlusLg, BsCart } from 'react-icons/bs';
import { useState } from 'react';
import AddCategoryForm from '../components/forms/AddCategoryForm';
import {
	Dropdown,
	DropdownButton,
	ButtonGroup,
} from 'react-bootstrap';

function RootLayout() {
	const [showAddCategoryForm, setShowAddCategoryForm] =
		useState(false);

	const handleClickAddCat = () => {
		setShowAddCategoryForm(!showAddCategoryForm);
	};

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

			<DropdownButton
				as={ButtonGroup}
				id={`dropdown-button-drop-up`}
				variant='none'
				title={
					<BsPlusLg className='floatingButtonIcon text-white' />
				}
				className='floatingDropDown rounded-circle'
			>
				<Dropdown.Item
					eventKey='1'
					onClick={handleClickAddCat}
				>
					Add Category
				</Dropdown.Item>
				<Dropdown.Item eventKey='2'>
					Add Product
				</Dropdown.Item>
			</DropdownButton>

			<AddCategoryForm
				show={showAddCategoryForm}
				handleClose={handleClickAddCat}
			/>
		</>
	);
}

export default RootLayout;
