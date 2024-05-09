/* eslint-disable no-mixed-spaces-and-tabs */
import {
	AppBar,
	Container,
	Dialog,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	Slide,
	TextField,
	Toolbar,
	Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import {
	ChangeEvent,
	ReactElement,
	Ref,
	forwardRef,
	useState,
	FormEvent,
	useMemo,
	useEffect,
} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { TProduct } from '../app/store/product';
import {
	filterProducts,
	sortProductsBasedOnPrice,
} from '../utils';
import { fetchProducts } from '../controllers/product';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { TCategory } from '../app/store/category';
import { TBrand } from '../app/store/brand';
import { fetchBrands } from '../controllers/brand';
import { fetchCategories } from '../controllers/category';
import FilterMenu from './FilterMenu';

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: ReactElement;
	},
	ref: Ref<unknown>,
) {
	return <Slide direction='down' ref={ref} {...props} />;
});

export default function SearchDialog() {
	const [openSearch, setOpenSearch] = useState(false);

	const handleClickOpenSearch = () => {
		setOpenSearch(true);
	};

	const handleCloseSearch = () => {
		setOpenSearch(false);
	};

	const [queryInput, setQueryInput] = useState('');
	const [priceFilter, setPriceFilter] = useState<string>('');

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

	const dispatch = useAppDispatch();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		handleQueryChange(e);
	};

	const filteredProducts = useMemo(() => {
		return sortProductsBasedOnPrice(
			filterProducts(
				products,
				brands,
				categories,
				queryInput,
			) as (TProduct | null)[],
			priceFilter,
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryInput, priceFilter]);

	useEffect(() => {
		dispatch(fetchProducts());
		dispatch(fetchCategories());
		dispatch(fetchBrands());
	}, [dispatch]);

	return (
		<>
			<IconButton onClick={handleClickOpenSearch}>
				<SearchIcon />
			</IconButton>
			<Dialog
				fullScreen
				open={openSearch}
				onClose={handleCloseSearch}
				TransitionComponent={Transition}
				dir='rtl'
			>
				<main dir='rtl'>
					<AppBar
						sx={{
							position: 'relative',
							bgcolor: '#fff',
						}}
					>
						<Toolbar>
							<IconButton
								edge='start'
								sx={{ color: 'error.main' }}
								onClick={handleCloseSearch}
								aria-label='close'
							>
								<CloseIcon />
							</IconButton>
							<FilterMenu
								setPriceFilter={setPriceFilter}
							/>
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
						</Toolbar>
					</AppBar>
					<Container sx={{ margin: '1rem 0' }}>
						<List>
							{filteredProducts?.length > 0 ? (
								filteredProducts.map(
									(product) => (
										<ListItemButton
											key={product?._id}
											href={`/products/${product?._id}`}
											sx={{
												'&:hover': {
													color: 'black',
												},
											}}
											onClick={() => {
												handleCloseSearch();
											}}
										>
											<img
												width={150}
												height={150}
												src={
													(product?.productImage !=
														null &&
														product
															?.productImage
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
							) : (
								<Typography
									variant='h6'
									sx={{ m: 3, color: 'black' }}
								>
									{`لا يوجد نتائج للبحث (${queryInput})`}
								</Typography>
							)}
						</List>
					</Container>
				</main>
			</Dialog>
		</>
	);
}
