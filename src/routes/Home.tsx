import { memo, useEffect, useState } from 'react';
import Banner from '../components/Banner';
import CategoryList from '../components/CategoryList';
import BrandList from '../components/BrandList';
import { Box } from '@mui/material';
import MobileHome from '../components/mobileComponents/MobileHome';
import { TBanner } from '../app/store/banner';
import { fetchBannerByType } from '../controllers/banner';

const Home = memo(() => {
	const [mainBanner, setMainBanner] = useState<TBanner | null>(
		null,
	);

	useEffect(() => {
		const getBanner = async () => {
			const fetchedBanner = await fetchBannerByType(
				'main',
			);
			setMainBanner(fetchedBanner);
		};
		getBanner();
	}, []);

	return (
		<div dir='rtl' style={{ height: '120dvh' }}>
			<Banner banner={mainBanner} />

			<Box
				sx={{
					display: { xs: 'none', sm: 'block' },
				}}
			>
				<CategoryList listLength={5} />
				<BrandList listLength={5} />
			</Box>

			<Box
				sx={{
					display: { sm: 'none' },
				}}
			>
				<MobileHome />
			</Box>
		</div>
	);
});

export default Home;
