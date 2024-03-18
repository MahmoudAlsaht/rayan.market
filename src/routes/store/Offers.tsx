import { memo, useEffect, useState } from 'react';
import { TProduct } from '../../app/store/product';
import { fetchOffers } from '../../controllers/product';
import ProductCard from '../../components/ProductCard';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/material';
import { fetchBanners } from '../../controllers/banner';
import { TBanner } from '../../app/store/banner';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Banner from '../../components/Banner';

const Offers = memo(() => {
	const [products, setProducts] =
		useState<(TProduct | null)[]>();

	const banners: (TBanner | null)[] = useAppSelector(
		(state) => state.banners,
	);
	const [offerBanner, setOfferBanner] =
		useState<TBanner | null>(null);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const getProducts = async () => {
			const fetchedProducts = await fetchOffers();
			setProducts(fetchedProducts);
		};
		getProducts();

		dispatch(fetchBanners());
		const OfferBanners = banners?.filter(
			(banner) => banner?.bannerType === 'offers',
		);
		setOfferBanner(OfferBanners[0]);
	}, [banners, dispatch]);
	return (
		<Box sx={{ mt: { sm: 17 } }}>
			<div dir='rtl'>
				<Banner banner={offerBanner} />

				<Grid container spacing={1} sx={{ mt: 2 }}>
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
									product={product as TProduct}
								/>
							</Grid>
						))}
				</Grid>
			</div>
		</Box>
	);
});

export default Offers;
