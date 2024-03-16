import { Box } from '@mui/material';
import BrandList from '../../components/BrandList';
import MobileBrandList from '../../components/mobileComponents/MobileBrandList';

export default function Brands() {
	return (
		<div dir='rtl'>
			<Box
				sx={{
					display: { xs: 'none', sm: 'block' },
				}}
			>
				<BrandList />
			</Box>

			<Box
				sx={{
					display: { sm: 'none' },
					mt: 10,
				}}
			>
				<MobileBrandList isHomePage={false} />
			</Box>
		</div>
	);
}
