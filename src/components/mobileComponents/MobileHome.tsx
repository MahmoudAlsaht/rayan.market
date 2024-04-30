import { useEffect, useState } from 'react';
import Banner from '../Banner';
import MobileBrandList from './MobileBrandList';
import MobileCategoryList from './MobileCategoryList';
import { fetchBanners } from '../../controllers/banner';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TBanner } from '../../app/store/banner';
import { Box, Paper, Typography } from '@mui/material';
import ProductsList from '../ProductsList';

export default function MobileHome() {
	const banners: (TBanner | null)[] = useAppSelector(
		(state) => state.banners,
	);
	const [offerBanner, setOfferBanner] =
		useState<TBanner | null>(null);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchBanners());
		const OfferBanners = banners?.filter(
			(banner) => banner?.bannerType === 'offers',
		);
		setOfferBanner(OfferBanners[0]);
	}, [banners, dispatch]);
	return (
		<main dir='rtl'>
			<MobileCategoryList isHomePage={true} />
			<MobileBrandList isHomePage={true} />
			<Box sx={{ mt: 5 }}>
				<Banner banner={offerBanner} />
				<Paper
					role='most view products'
					sx={{ mt: 15, bgcolor: 'inherit' }}
				>
					<Typography
						variant='h3'
						color='primary'
						sx={{ ml: 5, mt: 5 }}
					>
						الأكثر شيوعا
					</Typography>
					<ProductsList
						productsLength={6}
						mt={0}
						mb={20}
					/>
					<Box
						sx={{ height: '10px', width: '100%' }}
					/>
				</Paper>
			</Box>
		</main>
	);
}
