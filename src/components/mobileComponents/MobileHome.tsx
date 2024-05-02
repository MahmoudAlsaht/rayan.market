import { useEffect, useState } from 'react';
import Banner from '../Banner';
import MobileBrandList from './MobileBrandList';
import MobileCategoryList from './MobileCategoryList';
import { TBanner } from '../../app/store/banner';
import { Box, Paper, Typography } from '@mui/material';
import ProductsList from '../ProductsList';
import { fetchBannerByType } from '../../controllers/banner';

export default function MobileHome() {
	const [offerBanner, setOfferBanner] =
		useState<TBanner | null>(null);

	useEffect(() => {
		const getBanner = async () => {
			const fetchedBanner = await fetchBannerByType(
				'offers',
			);
			setOfferBanner(fetchedBanner);
		};
		getBanner();
	}, []);
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
					<ProductsList productsLength={6} mt={0} />
				</Paper>
			</Box>

			<Box>
				<Paper
					role='most view products'
					sx={{ bgcolor: 'inherit' }}
				>
					<Typography
						variant='h3'
						color='primary'
						sx={{ ml: 5, mt: 5 }}
					>
						الأكثر مبيعا
					</Typography>
					<ProductsList
						productsLength={6}
						mt={0}
						mb={20}
						sortBasedOn='numberOfPurchases'
					/>
					<Box
						sx={{ height: '10px', width: '100%' }}
					/>
				</Paper>
			</Box>
		</main>
	);
}
