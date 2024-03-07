import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TuneIcon from '@mui/icons-material/Tune';
import HomeIcon from '@mui/icons-material/Home';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MobileNavigation() {
	const isHomePage = window.location.href.search('home');
	const isSearchPage = window.location.href.search('search');

	const [page, setPage] = useState(() =>
		isHomePage !== -1
			? 'home'
			: isSearchPage !== -1
			? 'search'
			: 'options',
	);

	const navigate = useNavigate();

	const handlePageNameChange = (
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
				onChange={handlePageNameChange}
			>
				<BottomNavigationAction
					label='البحث'
					value='search'
					icon={<ManageSearchIcon />}
					onClick={() => navigate('/search')}
				/>

				<BottomNavigationAction
					label='الرئيسية'
					value='home'
					icon={<HomeIcon />}
					onClick={() => navigate('/home')}
				/>

				<BottomNavigationAction
					label='الخيارات'
					value='options'
					icon={<TuneIcon />}
					onClick={() => navigate('user-options')}
				/>
			</BottomNavigation>
		</>
	);
}
