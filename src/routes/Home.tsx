import { memo } from 'react';
import Banner from '../components/Banner';
import CategoryList from '../components/CategoryList';
import BrandList from '../components/BrandList';
import { Box } from '@mui/material';

const Home = memo(() => {
	return (
		<div dir='rtl'>
			<Box
				sx={{
					display: { xs: 'none', sm: 'block' },
				}}
			>
				<Banner />
				<CategoryList listLength={5} />
				<BrandList listLength={5} />
			</Box>
		</div>
	);
});

export default Home;
