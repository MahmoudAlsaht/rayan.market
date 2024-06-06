/* eslint-disable no-mixed-spaces-and-tabs */
import {
	AppBar,
	Box,
	Grid,
	IconButton,
	Tab,
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
	SyntheticEvent,
} from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { TProduct } from '../../app/store/product';
import { fetchProducts } from '../../controllers/product';
import { useNavigate } from 'react-router-dom';
import MobileProductCard from './MobileProductCard';
import FilterMenu from '../FilterMenu';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ProductsList from '../ProductsList';
import { TCategory } from '../../app/store/category';
import { TBrand } from '../../app/store/brand';
import {
	filterProducts,
	sortProductsBasedOnPrice,
} from '../../utils';
import { fetchCategories } from '../../controllers/category';
import { fetchBrands } from '../../controllers/brand';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { fetchBannerByType } from '../../controllers/banner';
import { TBanner } from '../../app/store/banner';
import Banner from '../../components/Banner';

export default function MobileSearch() {
	const [value, setValue] = useState('all');
	const [queryInput, setQueryInput] = useState('');
	const [priceFilter, setPriceFilter] = useState<string>('');
	const [offerBanner, setOfferBanner] =
		useState<TBanner | null>(null);
	const [homeProducts, setHomeProductsBanner] =
		useState<TBanner | null>(null);

	const handleTabChange = (
		event: SyntheticEvent,
		newValue: string,
	) => {
		setValue(newValue);
	};

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
		dispatch(fetchProducts());
		dispatch(fetchCategories());
		dispatch(fetchBrands());
		const getOffersBanner = async () => {
			const fetchedBanner = await fetchBannerByType(
				'offers',
			);
			setOfferBanner(fetchedBanner);
		};
		getOffersBanner();

		const getHomeProductsBanner = async () => {
			const fetchedBanner = await fetchBannerByType(
				'homeproducts',
			);
			setHomeProductsBanner(fetchedBanner);
		};
		getHomeProductsBanner();
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
							<FilterMenu
								setPriceFilter={setPriceFilter}
							/>
						</Toolbar>
					</AppBar>

					<TabContext value={value}>
						<Box
							sx={{
								borderBottom: 1,
								borderColor: 'divider',
							}}
						>
							<TabList
								onChange={handleTabChange}
								aria-label='navigate products types'
							>
								<Tab
									label='كل المنتجات'
									value='all'
								/>
								<Tab
									label='العروض'
									value='offers'
								/>
								<Tab
									label='المنزلية'
									value='homeproducts'
								/>
							</TabList>
						</Box>
						<TabPanel value='all'>
							<Grid
								container
								sx={{
									display: { sm: 'none' },
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
													product={
														product
													}
													key={
														product?._id
													}
												/>
											),
									)
								) : (
									<Typography
										variant='h6'
										sx={{
											m: 3,
											color: 'black',
										}}
									>
										{`لا يوجد نتائج للبحث (${queryInput})`}
									</Typography>
								)}
							</Grid>
						</TabPanel>
						<TabPanel value='offers'>
							<Banner banner={offerBanner} />

							<Grid
								container
								sx={{
									display: { sm: 'none' },
									mb: 5,
								}}
							>
								{filteredProducts.length > 0 ? (
									filteredProducts.map(
										(product) =>
											parseInt(
												product?.quantity as string,
											) > 0 &&
											product?.isOffer && (
												<MobileProductCard
													product={
														product
													}
													key={
														product?._id
													}
												/>
											),
									)
								) : (
									<Typography
										variant='h6'
										sx={{
											m: 3,
											color: 'black',
										}}
									>
										{`لا يوجد نتائج للبحث (${queryInput})`}
									</Typography>
								)}
							</Grid>
						</TabPanel>
						<TabPanel value='homeproducts'>
							<Banner banner={homeProducts} />

							<Grid
								container
								sx={{
									display: { sm: 'none' },
									mb: 5,
								}}
							>
								{filteredProducts.length > 0 ? (
									filteredProducts.map(
										(product) =>
											parseInt(
												product?.quantity as string,
											) > 0 &&
											product?.productType ===
												'home' && (
												<MobileProductCard
													product={
														product
													}
													key={
														product?._id
													}
												/>
											),
									)
								) : (
									<Typography
										variant='h6'
										sx={{
											m: 3,
											color: 'black',
										}}
									>
										{`لا يوجد نتائج للبحث (${queryInput})`}
									</Typography>
								)}
							</Grid>
						</TabPanel>
					</TabContext>

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
