import {
	ChangeEvent,
	memo,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TCategory } from '../../app/store/category';
import { fetchCategories } from '../../controllers/category';
import AddIcon from '@mui/icons-material/Add';
import CategoryForm from '../../components/forms/AddCategoryForm';
import CategorySetting from '../../components/dashboardComponents/CategorySettings';
import { filterData } from '../../utils';
import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TextField,
	Typography,
} from '@mui/material';

const CategoriesActions = memo(() => {
	const [showCategory, setShowCategory] = useState(false);

	const [queryInput, setQueryInput] = useState('');

	const dispatch = useAppDispatch();
	const categories: (TCategory | null)[] = useAppSelector(
		(state) => state.categories,
	);

	const handleClickAddCat = () => {
		setShowCategory(!showCategory);
	};

	const handleQueryChange = (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	const filteredCategories = useMemo(() => {
		return filterData(categories as any, queryInput);
	}, [categories, queryInput]);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<>
			<main dir='rtl'>
				<TableContainer
					component={Paper}
					sx={{ ml: { sm: 10 } }}
				>
					<Typography variant='h3' sx={{ ml: 3 }}>
						الأقسام
					</Typography>
					<TextField
						type='search'
						label='ابحث عن قسم'
						value={queryInput}
						onChange={handleQueryChange}
						sx={{ ml: 3 }}
					/>
					<IconButton onClick={handleClickAddCat}>
						<AddIcon />
					</IconButton>
					<Table sx={{ minWidth: 650 }}>
						<TableHead>
							<TableRow>
								<TableCell>
									{categories
										? categories.length
										: '#'}
								</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Image</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filteredCategories?.map(
								(category, index) => (
									<CategorySetting
										key={category?._id}
										category={category}
										index={index}
									/>
								),
							)}
						</TableBody>
					</Table>
					<IconButton onClick={handleClickAddCat}>
						<AddIcon />
					</IconButton>
				</TableContainer>
			</main>

			<CategoryForm
				show={showCategory}
				handleClose={handleClickAddCat}
			/>
		</>
	);
});

export default CategoriesActions;
