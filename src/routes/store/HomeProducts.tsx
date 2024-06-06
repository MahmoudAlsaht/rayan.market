import { memo, useEffect, useState } from 'react';
import { TProduct } from '../../app/store/product';
import { fetchProductsBasedOnType } from '../../controllers/product';
import ProductCard from '../../components/ProductCard';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/material';
import { fetchBannerByType } from '../../controllers/banner';
import { TBanner } from '../../app/store/banner';
import Banner from '../../components/Banner';
import MobileProductCard from '../../components/mobileComponents/MobileProductCard';

const HomeProducts = memo(() => {
	const [products, setProducts] =
		useState<(TProduct | null)[]>();
	const [homeProducts, setHomeProductsBanner] =
		useState<TBanner | null>(null);

	useEffect(() => {
		const getProducts = async () => {
			const fetchedProducts =
				await fetchProductsBasedOnType('home');
			setProducts(fetchedProducts);
		};
		getProducts();

		const getBanner = async () => {
			const fetchedBanner = await fetchBannerByType(
				'homeproducts',
			);
			setHomeProductsBanner(fetchedBanner);
		};
		getBanner();
	}, []);

	return (
		<>
			<Banner banner={homeProducts} />
			<Box sx={{ mt: { sm: 0 } }}>
				<div dir='rtl'>
					<Grid
						container
						spacing={1}
						sx={{
							mt: 2,
							display: {
								xs: 'none',
								sm: 'flex',
							},
						}}
					>
						{products &&
							products?.map((product) => (
								<Grid
									key={product?._id}
									xs={6}
									sm={4}
									md={3}
									lg={2}
								>
									<ProductCard
										product={
											product as TProduct
										}
									/>
								</Grid>
							))}
					</Grid>

					<Grid
						container
						sx={{
							mt: 2,
							mb: 10,
							display: {
								sm: 'none',
							},
						}}
					>
						{products?.map(
							(product) =>
								parseInt(
									product?.quantity as string,
								) > 0 && (
									<MobileProductCard
										key={product?._id}
										product={
											product as TProduct
										}
									/>
								),
						)}
					</Grid>
				</div>
			</Box>
		</>
	);
});

export default HomeProducts;
