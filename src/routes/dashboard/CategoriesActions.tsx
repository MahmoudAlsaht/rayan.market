import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TCategory } from '../../app/store/category';
import { fetchCategories } from '../../controllers/category';
import { BsPlusLg } from 'react-icons/bs';
import AddCategoryForm from '../../components/forms/AddCategoryForm';
import { Table, Button, Container } from 'react-bootstrap';
import CategorySettings from '../../components/dashboardComponents/CategorySettings';
import { filteredData } from '../../utils';
import { DocumentData } from 'firebase/firestore';

function CategoriesSettings() {
	const [showAddCategoryForm, setShowAddCategoryForm] =
		useState(false);

	const [queryInput, setQueryInput] = useState('');

	const dispatch = useAppDispatch();
	const categories: TCategory[] | null = useAppSelector(
		(state) => state.categories,
	);

	const handleClickAddCat = () => {
		setShowAddCategoryForm(!showAddCategoryForm);
	};

	const handleQueryChange = (
		e: FormEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	const filteredCategories = useMemo(() => {
		return filteredData(
			categories as DocumentData[],
			queryInput,
		);
	}, [categories, queryInput]);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<>
			<Container>
				<h1 className='ms-5 mt-5'>Categories</h1>
				<input
					className='searchInput'
					type='search'
					placeholder='search categories'
					value={queryInput}
					onChange={handleQueryChange}
				/>
				<Button
					className='ms-2'
					onClick={handleClickAddCat}
					variant='outline-primary'
				>
					<BsPlusLg className='floatingButtonIcon' />
				</Button>
				<Table>
					<thead>
						<tr>
							<th scope='col'></th>
							<th scope='col'>Name</th>
							<th scope='col'></th>
						</tr>
					</thead>
					<tbody>
						{filteredCategories?.map(
							(category, index) => (
								<CategorySettings
									key={category?.id}
									categoryId={category?.id}
									index={index}
									categoryName={category?.name}
								/>
							),
						)}
					</tbody>
				</Table>
				<Button
					variant='outline-primary'
					onClick={handleClickAddCat}
					className='mb-5'
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
