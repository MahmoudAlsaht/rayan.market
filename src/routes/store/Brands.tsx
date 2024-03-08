import { Box } from '@mui/material';
import BrandList from '../../components/BrandList';
import MobileBrandList from '../../components/mobileComponents/MobileBrandList';

export default function Brands() {
	return (
		<>
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
				}}
			>
				<MobileBrandList isHomePage={false} />
			</Box>
		</>
	);
}
