import { Outlet } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import AppFooter from '../components/AppFooter';
import { Box } from '@mui/material';
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

			<Outlet />
			<AppFooter />
		</>
	);
}

export default CheckoutLayout;
