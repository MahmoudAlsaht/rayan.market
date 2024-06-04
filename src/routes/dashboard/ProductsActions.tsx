import {
	ChangeEvent,
	memo,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../controllers/product';
import AddIcon from '@mui/icons-material/Add';
import AddProductForm from '../../components/forms/AddProductForm';
import ProductSettings from '../../components/dashboardComponents/ProductSettings';
import { TProduct } from '../../app/store/product';
import { filterData } from '../../utils';
import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material';

const ProductsSettings = memo(() => {
	const [showAddProductForm, setShowAddProductForm] =
		useState(false);
	const [queryInput, setQueryInput] = useState('');

	const dispatch = useAppDispatch();
	const products: (TProduct | null)[] = useAppSelector(
		(state) => state.products,
	);

	const handleClickAddProduct = () => {
		setShowAddProductForm(!showAddProductForm);
	};

	const handleQueryChange = (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	const filteredProducts = useMemo(() => {
		return filterData(products, queryInput);
	}, [products, queryInput]);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<main dir='rtl'>
			<TableContainer
				sx={{ ml: { sm: 10 } }}
				component={Paper}
			>
				<Typography variant='h3' sx={{ ml: 3 }}>
					المنتجات
				</Typography>
				<TextField
					type='search'
					label='البحث عن منتج'
					value={queryInput}
					onChange={handleQueryChange}
				/>
				<IconButton onClick={handleClickAddProduct}>
					<AddIcon />
				</IconButton>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								{products
									? products.length
									: '#'}
							</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredProducts?.map(
							(product, index) => (
								<ProductSettings
									key={product?._id}
									product={product as TProduct}
									index={index}
									productType={
										product?.productType
									}
								/>
							),
						)}
					</TableBody>
				</Table>
				<IconButton onClick={handleClickAddProduct}>
					<AddIcon />
				</IconButton>
			</TableContainer>

			<AddProductForm
				show={showAddProductForm}
				handleClose={handleClickAddProduct}
			/>
		</main>
	);
});

export default ProductsSettings;
