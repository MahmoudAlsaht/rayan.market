import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { TProduct } from '../../app/store/product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../controllers/product';
import { Box, Grid } from '@mui/material';
import MobileProductCard from '../../components/mobileComponents/MobileProductCard';
import MainMobileNavBar from './MainMobileNavBar';
import { TBrand } from '../../app/store/brand';
import { fetchBrand } from '../../controllers/brand';
import Banner from '../../components/Banner';
import { TBanner } from '../../app/store/banner';

const Brand = memo(() => {
	const { brandId } = useParams();
	const dispatch = useAppDispatch();
	const allProducts: (TProduct | null)[] = useAppSelector(
		(state) => state.products,
	);
	const [brand, setBrand] = useState<TBrand | null>(null);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const getBrand = async () => {
			const fetchedCategory = await fetchBrand(
				brandId as string,
			);
			setBrand(fetchedCategory);
		};
		getBrand();
		dispatch(fetchProducts());
		setIsLoading(false);
	}, [brandId, dispatch]);

	return (
		<Box sx={{ mt: { sm: 17 } }}>
			{!isLoading ? (
				<div dir='rtl'>
					<Banner
						banner={brand?.banner as TBanner | null}
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
								product?.brand?._id ===
									brandId && (
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
									product?.brand?._id ===
										brandId && (
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

export default Brand;
