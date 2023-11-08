import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Category } from '../../app/store/category';
import { fetchCategories } from '../../controllers/category';
import { BsPlusLg } from 'react-icons/bs';
import AddCategoryForm from '../../components/forms/AddCategoryForm';
import { Table, Button, Container } from 'react-bootstrap';
import CategorySettings from '../../components/dashboardComponents/CategorySettings';

function CategoriesSettings() {
	const [showAddCategoryForm, setShowAddCategoryForm] =
		useState(false);

	const dispatch = useAppDispatch();
	const categories: Category[] | null = useAppSelector(
		(state) => state.categories,
	);

	const handleClickAddCat = () => {
		setShowAddCategoryForm(!showAddCategoryForm);
	};

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<>
			<Container>
				<Table>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Name</th>
							<th scope='col'>
								<Button
									onClick={handleClickAddCat}
									variant='outline-primary'
								>
									<BsPlusLg className='floatingButtonIcon' />
								</Button>
							</th>
						</tr>
					</thead>
					<tbody>
						{categories?.map((category, index) => (
							<CategorySettings
								key={category?.id}
								categoryId={category?.id}
								index={index}
								categoryName={category?.name}
							/>
						))}
					</tbody>
				</Table>
				<Button
					variant='outline-primary'
					onClick={handleClickAddCat}
				>
					<BsPlusLg className='floatingButtonIcon' />
				</Button>
			</Container>

			<AddCategoryForm
				show={showAddCategoryForm}
				handleClose={handleClickAddCat}
			/>
		</>
	);
}

export default CategoriesSettings;
