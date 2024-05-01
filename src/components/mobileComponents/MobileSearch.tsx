/* eslint-disable no-mixed-spaces-and-tabs */
import {
	AppBar,
	Box,
	Grid,
	IconButton,
	TextField,
	Toolbar,
	Typography,
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
import { fetchProducts } from '../../controllers/product';
// import NotFound404 from '../../routes/NotFound404';
import { useNavigate } from 'react-router-dom';
import MobileProductCard from './MobileProductCard';
import FilterMenu from '../FilterMenu';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ProductsList from '../ProductsList';
import { TCategory } from '../../app/store/category';
import { TBrand } from '../../app/store/brand';
import { filterProducts } from '../../utils';
import { fetchCategories } from '../../controllers/category';
import { fetchBrands } from '../../controllers/brand';
import { TLabel, getLabels } from '../../controllers/label';

export default function MobileSearch() {
	const [queryInput, setQueryInput] = useState('');
	const navigate = useNavigate();
	const handleQueryChange = (
		e: FormEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};
	const products: (TProduct | null)[] = useAppSelector(
		(state) => state.products,
	);
	const categories: (TCategory | null)[] = useAppSelector(
		(state) => state.categories,
	);
	const brands: (TBrand | null)[] = useAppSelector(
		(state) => state.brands,
	);

	const [showSearchResult, setShowSearchResult] =
		useState(false);

	const [labels, setLabels] = useState<TLabel[] | null>(null);

	const dispatch = useAppDispatch();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setShowSearchResult(e.target.value !== '');
		handleQueryChange(e);
		console.log(showSearchResult);
	};

	const filteredProducts = useMemo(() => {
		return filterProducts(
			products,
			brands,
			categories,
			labels,
			queryInput,
		) as (TProduct | null)[];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryInput]);

	useEffect(() => {
		const fetchLabels = async () => {
			const fetchedLabels = await getLabels();
			setLabels(fetchedLabels);
		};
		fetchLabels();
		dispatch(fetchProducts());
		dispatch(fetchProducts());
		dispatch(fetchCategories());
		dispatch(fetchBrands());
	}, [dispatch]);

	return (
		<>
			<main dir='rtl'>
				<Box
					sx={{
						mb: 15,
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
								label='ابحث عن منتج، قسم، أو علامة تجارية.....'
								inputProps={{
									style: {
										outline: 'none',
									},
								}}
								sx={{ m: '.7rem' }}
								onChange={handleChange}
							/>
							<FilterMenu />
						</Toolbar>
					</AppBar>
					<Grid
						container
						sx={{
							display: { sm: 'none' },
							mt: 2,
							mb: 5,
						}}
					>
						{filteredProducts.length > 0 ? (
							filteredProducts.map(
								(product) =>
									parseInt(
										product?.quantity as string,
									) > 0 && (
										<MobileProductCard
											product={product}
											key={product?._id}
										/>
									),
							)
						) : (
							<Typography
								variant='h6'
								sx={{ m: 3, color: 'black' }}
							>
								{`لا يوجد نتائج للبحث (${queryInput})`}
							</Typography>
						)}
					</Grid>
					<Box
						sx={{
							display: { xs: 'none', sm: 'flex' },
						}}
					>
						<ProductsList mt={0} />
					</Box>
				</Box>
			</main>
		</>
	);
}
