import { IconButton, Menu, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState, MouseEvent } from 'react';

const ITEM_HEIGHT = 48;

export default function FilterMenu({
	setPriceFilter,
}: {
	setPriceFilter: (value: string) => void;
}) {
	const [filterAnchorEl, setFilterAnchorEl] =
		useState<null | HTMLElement>(null);
	const filterOpen = Boolean(filterAnchorEl);

	const handleFilterClick = (
		event: MouseEvent<HTMLElement>,
	) => {
		setFilterAnchorEl(event.currentTarget);
	};
	const handleFilterClose = () => {
		setFilterAnchorEl(null);
	};
	return (
		<>
			<IconButton
				aria-label='more'
				id='filterButton'
				aria-controls={
					filterOpen ? 'filterMenu' : undefined
				}
				aria-expanded={filterOpen ? 'true' : undefined}
				aria-haspopup='true'
				onClick={handleFilterClick}
			>
				<FilterListIcon />
			</IconButton>
			<Menu
				id='filterMenu'
				MenuListProps={{
					'aria-labelledby': 'filterButton',
				}}
				anchorEl={filterAnchorEl}
				open={filterOpen}
				onClose={handleFilterClose}
				slotProps={{
					paper: {
						style: {
							maxHeight: ITEM_HEIGHT * 4.5,
							width: '20ch',
						},
					},
				}}
			>
				<legend dir='rtl'>
					<MenuItem
						// selected={option === 'Pyxis'}
						onClick={() => {
							setPriceFilter('highest');
							handleFilterClose();
						}}
					>
						الأعلى سعرا
					</MenuItem>
					<MenuItem
						// selected={option === 'Pyxis'}
						onClick={() => {
							setPriceFilter('lowest');
							handleFilterClose();
						}}
					>
						الأقل سعرا
					</MenuItem>
				</legend>
			</Menu>
		</>
	);
}
