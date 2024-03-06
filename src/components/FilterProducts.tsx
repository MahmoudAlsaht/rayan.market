/* eslint-disable no-mixed-spaces-and-tabs */

import Paper from '@mui/material/Paper';
import SearchDialog from './SearchDialog';
import FilterMenu from './FilterMenu';

export default function FilterProducts() {
	return (
		<Paper
			component='form'
			sx={{
				p: '2px 4px',
				display: 'flex',
				alignItems: 'center',
				border: 'none',
				bgcolor: 'inherit',
			}}
		>
			<SearchDialog />
			<FilterMenu />
		</Paper>
	);
}
