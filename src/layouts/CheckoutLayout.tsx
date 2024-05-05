import { Outlet } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import AppFooter from '../components/AppFooter';
import { Box } from '@mui/material';
import MobileNavigation from '../components/mobileComponents/MobileNavigation';
function CheckoutLayout() {
	return (
		<>
			<Box
				sx={{
					display: { xs: 'none', sm: 'block' },
				}}
			>
				<MainNavbar />
			</Box>

			<Box sx={{ display: { sm: 'none' } }}>
				<MobileNavigation />
			</Box>

			<Outlet />
			<AppFooter />
		</>
	);
}

export default CheckoutLayout;
