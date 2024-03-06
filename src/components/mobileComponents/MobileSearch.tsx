/* eslint-disable no-mixed-spaces-and-tabs */
import {
	AppBar,
	Box,
	Grid,
	IconButton,
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
import MobileProductCard from './MobileProductCard';

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
					<Grid
						container
						sx={{
							mt: 2,
							mb: 5,
						}}
						spacing={1}
					>
						{filteredProducts.map(
							(product) =>
								parseInt(
									product?.quantity as string,
								) > 0 && (
									<MobileProductCard
										product={product}
										key={product?._id}
									/>
								),
						)}
					</Grid>
				</Box>
			</main>
		</>
	);
}
