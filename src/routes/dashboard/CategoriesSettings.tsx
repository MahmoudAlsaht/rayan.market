import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ICategory } from '../../app/store/category';
import { fetchCategories } from '../../controllers/category';
import { BsPlusLg } from 'react-icons/bs';
import AddCategoryForm from '../../components/forms/AddCategoryForm';
import { Table, Button, Container } from 'react-bootstrap';

function CategoriesSettings() {
	const [showAddCategoryForm, setShowAddCategoryForm] =
		useState(false);

	const dispatch = useAppDispatch();
	const categories: ICategory[] | null = useAppSelector(
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
							<th>#</th>
							<th>Name</th>
							<th>Id</th>
							<th>
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
							<tr key={category?.id}>
								<td>{index + 1}</td>
								<td>{category?.name}</td>
								<td>{category?.id}</td>
								<td>
									<Button variant='outline-warning'>
										Edit
									</Button>
								</td>
							</tr>
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
