import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { TProduct } from '../../app/store/product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../controllers/product';
import { Box, Grid } from '@mui/material';
import MobileProductCard from '../../components/mobileComponents/MobileProductCard';
import MainMobileNavBar from './MainMobileNavBar';
import Banner from '../../components/Banner';
import { TCategory } from '../../app/store/category';
import { TBanner } from '../../app/store/banner';
import { fetchCategory } from '../../controllers/category';

const Category = memo(() => {
	const { categoryId } = useParams();
	const dispatch = useAppDispatch();
	const allProducts: (TProduct | null)[] = useAppSelector(
		(state) => state.products,
	);

	const [category, setCategory] = useState<TCategory | null>(
		null,
	);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		dispatch(fetchProducts());
		const getCategory = async () => {
			const fetchedCategory = await fetchCategory(
				categoryId as string,
			);
			setCategory(fetchedCategory);
		};
		getCategory();
		setIsLoading(false);
	}, [categoryId, dispatch]);

	return (
		<Box sx={{ mt: { sm: 17 } }}>
			{!isLoading ? (
				<div dir='rtl'>
					<Banner
						banner={
							category?.banner as TBanner | null
						}
					/>
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
						<MainMobileNavBar />
						<Grid container sx={{ mb: 10 }}>
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
		</Box>
	);
});

export default Category;
