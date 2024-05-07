import {
	ChangeEvent,
	memo,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TBrand } from '../../app/store/brand';
import { fetchBrands } from '../../controllers/brand';
import AddIcon from '@mui/icons-material/Add';
import BrandForm from '../../components/forms/AddBrandForm';
import BrandSettings from '../../components/dashboardComponents/BrandSettings';
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

const BrandsActions = memo(() => {
	const [showBrandForm, setShowBrandForm] = useState(false);

	const [queryInput, setQueryInput] = useState('');

	const dispatch = useAppDispatch();
	const brands: (TBrand | null)[] = useAppSelector(
		(state) => state.brands,
	);

	const handleClickAddBrand = () => {
		setShowBrandForm(!showBrandForm);
	};

	const handleQueryChange = (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	const filteredBrands = useMemo(() => {
		return filterData(brands as any, queryInput);
	}, [brands, queryInput]);

	useEffect(() => {
		dispatch(fetchBrands());
	}, [dispatch]);

	return (
		<>
			<main dir='rtl'>
				<TableContainer
					component={Paper}
					sx={{ ml: { sm: 10 } }}
				>
					<Typography variant='h3' sx={{ ml: 3 }}>
						العلامات التجارية
					</Typography>
					<TextField
						type='search'
						label='ابحث عن علامة تجارية'
						value={queryInput}
						onChange={handleQueryChange}
						sx={{ ml: 3 }}
					/>
					<IconButton onClick={handleClickAddBrand}>
						<AddIcon />
					</IconButton>
					<Table sx={{ minWidth: 650 }}>
						<TableHead>
							<TableRow>
								<TableCell>
									{brands
										? brands.length
										: '#'}
								</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Image</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filteredBrands?.map(
								(brand, index) => (
									<BrandSettings
										key={brand?._id}
										brand={brand}
										index={index}
									/>
								),
							)}
						</TableBody>
					</Table>
					<IconButton onClick={handleClickAddBrand}>
						<AddIcon />
					</IconButton>
				</TableContainer>
			</main>

			<BrandForm
				show={showBrandForm}
				handleClose={handleClickAddBrand}
			/>
		</>
	);
});

export default BrandsActions;
