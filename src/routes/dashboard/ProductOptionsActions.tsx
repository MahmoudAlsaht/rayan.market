import {
	ChangeEvent,
	memo,
	useEffect,
	useMemo,
	useState,
} from 'react';
import AddIcon from '@mui/icons-material/Add';
import AddProductOptionsForm from '../../components/forms/AddProductOptionsForm';
import ProductOptionsSettings from '../../components/dashboardComponents/ProductOptionsSettings';
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
import {
	TProductOption,
	getProductOptions,
} from '../../controllers/productOptions';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../../controllers/product';

const ProductOptionsActions = memo(() => {
	const { productId } = useParams();

	const [
		showAddProductOptionsForm,
		setShowAddProductOptionsForm,
	] = useState(false);
	const [queryInput, setQueryInput] = useState('');

	const [productOptions, setProductOptions] = useState<
		(TProductOption | null)[]
	>([]);

	const [product, setProduct] = useState<TProduct | null>(
		null,
	);

	const handleClickAddProductOptions = () => {
		setShowAddProductOptionsForm(!showAddProductOptionsForm);
	};

	const handleQueryChange = (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	const filteredProductOptions = useMemo(() => {
		return filterData(productOptions, queryInput);
	}, [productOptions, queryInput]);

	const handleSetProductOptions = (
		productOption: TProductOption | null,
	) => {
		setProductOptions((prevOptions) => [
			...prevOptions,
			productOption,
		]);
	};

	const handleUpdateProductOptions = (
		productOption: TProductOption | null,
	) => {
		setProductOptions((prevOptions) => {
			return prevOptions.map((option) => {
				return option?._id === productOption?._id
					? productOption
					: option;
			});
		});
	};

	const handleDeleteProductOptions = (
		productOptionId: string,
	) => {
		setProductOptions((prevOptions) => {
			return prevOptions.filter((option) => {
				return option?._id !== productOptionId && option;
			});
		});
	};
	useEffect(() => {
		const fetchProductOptions = async () => {
			const fetchedProductOptions =
				await getProductOptions(productId as string);
			setProductOptions(fetchedProductOptions);
		};
		fetchProductOptions();

		const getProduct = async () => {
			const fetchedProduct = await fetchProduct(
				productId as string,
			);
			setProduct(fetchedProduct);
		};
		getProduct();
	}, [productId]);

	return (
		<main dir='rtl'>
			<TableContainer
				sx={{ ml: { sm: 10 } }}
				component={Paper}
			>
				<Typography variant='h3' sx={{ ml: 3 }}>
					فئات {product?.name}
				</Typography>
				<TextField
					type='search'
					label={`البحث عن فئات ${product?.name}`}
					value={queryInput}
					onChange={handleQueryChange}
				/>
				<IconButton
					onClick={handleClickAddProductOptions}
				>
					<AddIcon />
				</IconButton>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								{productOptions
									? productOptions.length
									: '#'}
							</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredProductOptions?.map(
							(productOption, index) => (
								<ProductOptionsSettings
									updateProductOptions={
										handleUpdateProductOptions
									}
									deleteOption={
										handleDeleteProductOptions
									}
									key={productOption?._id}
									productOption={
										productOption as TProductOption
									}
									index={index}
								/>
							),
						)}
					</TableBody>
				</Table>
				<IconButton
					onClick={handleClickAddProductOptions}
				>
					<AddIcon />
				</IconButton>
			</TableContainer>

			<AddProductOptionsForm
				setProductOptions={handleSetProductOptions}
				show={showAddProductOptionsForm}
				handleClose={handleClickAddProductOptions}
				productName={product?.name as string}
			/>
		</main>
	);
});

export default ProductOptionsActions;
