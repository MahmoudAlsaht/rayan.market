// import { useEffect, useState } from 'react';
// import Banner from '../Banner';
import MobileBrandList from './MobileBrandList';
import MobileCategoryList from './MobileCategoryList';
// import { TBanner } from '../../app/store/banner';
import { Box } from '@mui/material';
// import { fetchBannerByType } from '../../controllers/banner';
import ProductListPreview from '../ProductListPreview';

export default function MobileHome() {
	// const [offerBanner, setOfferBanner] =
	// 	useState<TBanner | null>(null);

	// useEffect(() => {
	// 	const getBanner = async () => {
	// 		const fetchedBanner = await fetchBannerByType(
	// 			'offers',
	// 		);
	// 		setOfferBanner(fetchedBanner);
	// 	};
	// 	getBanner();
	// }, []);
	return (
		<main dir='rtl'>
			<MobileCategoryList isHomePage={true} />
			{/* <Box sx={{ mt: 5 }}>
				<Banner banner={offerBanner} />
			</Box> */}

			<Box>
				<ProductListPreview
					title='الأكثر شيوعا'
					sortBasedOn='views'
					productsLength={5}
				/>
				<ProductListPreview
					title='الأكثر مبيعا'
					mt={0}
					mb={0}
					sortBasedOn='purchases'
					productsLength={5}
				/>
			</Box>

			<Box>
				<MobileBrandList isHomePage={true} />
				<Box sx={{ height: '100px', width: '100%' }} />
			</Box>
		</main>
	);
}
