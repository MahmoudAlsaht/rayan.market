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
import { filterData } from '../utils';
import { fetchProducts } from '../controllers/product';
import { useAppDispatch, useAppSelector } from '../app/hooks';

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

	const handleQueryChange = (
		e: FormEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	const products: (TProduct | null)[] = useAppSelector(
		(state) => state.products,
	);
	const dispatch = useAppDispatch();

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
		dispatch(fetchProducts());
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
								sx={{ color: 'black' }}
								onClick={handleCloseSearch}
								aria-label='close'
							>
								<CloseIcon />
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
					<Container sx={{ margin: '1rem 0' }}>
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
								: `${queryInput} لا توجد نتائج لبحثك`}
						</List>
					</Container>
				</main>
			</Dialog>
		</>
	);
}
