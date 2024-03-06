/* eslint-disable no-mixed-spaces-and-tabs */
import {
	AppBar,
	Box,
	Container,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	TextField,
	Toolbar,
} from '@mui/material';
import {
	ChangeEvent,
	useState,
	FormEvent,
	useMemo,
	useEffect,
} from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { TProduct } from '../../app/store/product';
import { filterData } from '../../utils';
import { fetchFilteredProducts } from '../../controllers/product';
import NotFound404 from '../../routes/NotFound404';
import { useNavigate } from 'react-router-dom';

export default function MobileSearch() {
	const [queryInput, setQueryInput] = useState('');
	const navigate = useNavigate();
	const handleQueryChange = (
		e: FormEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	const [products, setProducts] = useState<
		(TProduct | null)[]
	>([]);

	const [showSearchResult, setShowSearchResult] =
		useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setShowSearchResult(e.target.value !== '');
		handleQueryChange(e);
		console.log(showSearchResult);
	};

	const filteredProducts = useMemo(() => {
		return filterData(
			products,
			queryInput,
		) as (TProduct | null)[];
	}, [products, queryInput]);

	useEffect(() => {
		const getProducts = async () => {
			const fetchedProducts =
				await fetchFilteredProducts();
			setProducts(fetchedProducts);
		};
		getProducts();
	}, []);

	return (
		<>
			<Box
				sx={{
					display: { xs: 'none', sm: 'block' },
				}}
			>
				<NotFound404 />
			</Box>
			<main dir='rtl'>
				<Box
					sx={{
						display: { sm: 'none' },
					}}
				>
					<AppBar
						sx={{
							position: 'relative',
							bgcolor: '#fff',
						}}
					>
						<Toolbar>
							<IconButton
								edge='start'
								sx={{ color: 'black' }}
								aria-label='close'
								onClick={() => navigate(-1)}
							>
								<KeyboardArrowRightIcon />
							</IconButton>
							<TextField
								fullWidth
								variant='standard'
								type='search'
								label='ابحث عن منتج'
								inputProps={{
									style: {
										outline: 'none',
									},
								}}
								sx={{ m: '.7rem' }}
								onChange={handleChange}
							/>
						</Toolbar>
					</AppBar>
					<Container
						sx={{
							margin: '1rem 0',
							color: 'primary.main',
						}}
					>
						<List>
							{filteredProducts?.length !== 0
								? filteredProducts.map(
										(product) => (
											<ListItemButton
												key={
													product?._id
												}
												href={`/products/${product?._id}`}
												sx={{
													'&:hover': {
														color: 'black',
													},
												}}
											>
												<img
													width={150}
													height={150}
													src={
														(product?.productImages !=
															null &&
															product
																?.productImages[0]
																?.path) ||
														''
													}
												/>
												<ListItemText
													primary={
														product?.name
													}
													secondary={
														product?.price
													}
													sx={{
														ml: '1rem',
													}}
												/>
											</ListItemButton>
										),
								  )
								: `${queryInput} لا توجد نتائج لبحثك`}
						</List>
					</Container>
				</Box>
			</main>
		</>
	);
}
