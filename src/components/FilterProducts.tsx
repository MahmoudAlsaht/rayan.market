/* eslint-disable no-mixed-spaces-and-tabs */
import SearchDialog from './SearchDialog';
import { Box } from '@mui/material';

export default function FilterProducts() {
	return (
		<Box
			sx={{
				p: '2px 4px',
				display: 'flex',
				alignItems: 'center',
				border: 'none',
				background: 'none',
			}}
		>
			<SearchDialog />
		</Box>
	);
}
