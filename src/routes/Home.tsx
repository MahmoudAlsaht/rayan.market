import { memo, useEffect, useState } from 'react';
import Banner from '../components/Banner';
import CategoryList from '../components/CategoryList';
import BrandList from '../components/BrandList';
import { Box } from '@mui/material';
import MobileHome from '../components/mobileComponents/MobileHome';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchBanners } from '../controllers/banner';
import { TBanner } from '../app/store/banner';

const Home = memo(() => {
	const banners: (TBanner | null)[] = useAppSelector(
		(state) => state.banners,
	);
	const [mainBanner, setMainBanner] = useState<TBanner | null>(
		null,
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchBanners());
		const mainBanners = banners?.filter(
			(banner) => banner?.bannerType === 'main',
		);
		setMainBanner(mainBanners[0]);
	}, [banners, dispatch]);

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
