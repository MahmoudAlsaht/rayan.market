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
import { fetchProducts } from '../../controllers/product';
import NotFound404 from '../../routes/NotFound404';
import { useNavigate } from 'react-router-dom';
import MobileProductCard from './MobileProductCard';
import FilterMenu from '../FilterMenu';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

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

	const [showSearchResult, setShowSearchResult] =
		useState(false);

	const dispatch = useAppDispatch();

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
		dispatch(fetchProducts());
	}, [dispatch]);

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
							<FilterMenu />
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
