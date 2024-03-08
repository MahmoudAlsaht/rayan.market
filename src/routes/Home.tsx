import { memo } from 'react';
import Banner from '../components/Banner';
import CategoryList from '../components/CategoryList';
import BrandList from '../components/BrandList';
import { Box } from '@mui/material';
import MobileHome from '../components/mobileComponents/MobileHome';

const Home = memo(() => {
	return (
		<div dir='rtl' style={{ height: '120dvh' }}>
			<Banner />

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
