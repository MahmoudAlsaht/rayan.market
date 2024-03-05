import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InventoryIcon from '@mui/icons-material/Inventory';
import TuneIcon from '@mui/icons-material/Tune';
import HomeIcon from '@mui/icons-material/Home';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { SyntheticEvent, useState } from 'react';
import { Box } from '@mui/material';
import MobileHome from './MobileHome';
import MobileSearch from './MobileSearch';
import MobileProducts from './MobileProducts';
import MobileOptions from './MobileOptions';

export default function HomeMobile() {
	const [page, setPage] = useState('home');

	const handleChange = (
		event: SyntheticEvent,
		newPage: string,
	) => {
		setPage(newPage);
	};

	return (
		<>
			<BottomNavigation
				sx={{
					width: '100%',
					position: 'fixed',
					bottom: 0,
				}}
				value={page}
				onChange={handleChange}
			>
				<BottomNavigationAction
					label='الرئيسية'
					value='home'
					icon={<HomeIcon />}
				/>

				<BottomNavigationAction
					label='المنتجات'
					value='products'
					icon={<InventoryIcon />}
				/>

				<BottomNavigationAction
					label='البحث'
					value='search'
					icon={<ManageSearchIcon />}
				/>
				<BottomNavigationAction
					label='الخيارات'
					value='options'
					icon={<TuneIcon />}
				/>
			</BottomNavigation>

			<Box>
				{page === 'home' ? (
					<MobileHome />
				) : page === 'search' ? (
					<MobileSearch />
				) : page === 'products' ? (
					<MobileProducts />
				) : (
					page === 'options' && <MobileOptions />
				)}
			</Box>
		</>
	);
}
