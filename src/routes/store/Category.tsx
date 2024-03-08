import { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { TProduct } from '../../app/store/product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../controllers/product';
import {
	AppBar,
	Box,
	Grid,
	IconButton,
	Toolbar,
} from '@mui/material';
import MobileProductCard from '../../components/mobileComponents/MobileProductCard';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Category = memo(() => {
	const { categoryId } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const allProducts: (TProduct | null)[] = useAppSelector(
		(state) => state.products,
	);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		dispatch(fetchProducts());
		setIsLoading(false);
	}, [categoryId, dispatch]);

	return (
		<>
			{!isLoading ? (
				<div dir='rtl'>
					<Grid
						container
						sx={{
							display: {
								xs: 'none',
								sm: 'flex',
							},
						}}
					>
						{allProducts?.map(
							(product) =>
								product?.category?._id ===
									categoryId && (
									<Grid
										key={product?._id}
										sm={3}
										lg={2}
									>
										<ProductCard
											product={
												product as TProduct
											}
										/>
									</Grid>
								),
						)}
					</Grid>

					<Box
						sx={{
							display: {
								sm: 'none',
							},
						}}
					>
						<AppBar
							sx={{
								position: 'relative',
								bgcolor: '#fff',
								mb: 2,
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
							</Toolbar>
						</AppBar>
						<Grid container>
							{allProducts?.map(
								(product) =>
									product?.category?._id ===
										categoryId && (
										<MobileProductCard
											product={
												product as TProduct
											}
										/>
									),
							)}
						</Grid>
					</Box>
				</div>
			) : null}
		</>
	);
});

export default Category;
