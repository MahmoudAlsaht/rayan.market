import { Box } from '@mui/material';
import CategoryList from '../../components/CategoryList';
import MobileCategoryList from '../../components/mobileComponents/MobileCategoryList';

export default function Categories() {
	return (
		<>
			<Box
				sx={{
					display: { xs: 'none', sm: 'block' },
				}}
			>
				<CategoryList />
			</Box>

			<Box
				sx={{
					display: { sm: 'none' },
				}}
			>
				<MobileCategoryList isHomePage={false} />
			</Box>
		</>
	);
}
