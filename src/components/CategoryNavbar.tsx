import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { fetchCategories } from '../controllers/category';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect, useState, MouseEvent } from 'react';
import { TCategory } from '../app/store/category';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Menu, MenuItem } from '@mui/material';

const ITEM_HEIGHT = 48;

export default function CategoryNavbar() {
	const dispatch = useAppDispatch();
	const { categoryId } = useParams();
	const [anchorElNav, setAnchorElNav] =
		useState<null | HTMLElement>(null);
	const navMenuOpen = Boolean(anchorElNav);

	const categories: (TCategory | null)[] = useAppSelector(
		(state) => state.categories,
	);

	const handleOpenNavMenu = (
		event: MouseEvent<HTMLElement>,
	) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<Box
			sx={{
				maxWidth: { sm: '100%' },
			}}
		>
			{categories.length !== 0 && (
				<div dir='rtl'>
					<Tabs>
						{categories?.map(
							(category, index) =>
								index < 6 && (
									<Link
										key={category?._id}
										to={`/categories/${category?._id}`}
									>
										<Tab
											sx={{
												fontSize: '17px',
												color:
													category?._id ===
													categoryId
														? '#07a180'
														: '#064869',
												backgroundColor:
													category?._id ===
													categoryId
														? '#07a1801f'
														: 'unset',
												borderRadius:
													'.7rem',
											}}
											label={
												category?.name
											}
										/>
									</Link>
								),
						)}

						<Tab
							sx={{
								fontSize: '17px',
								color: '#064869',
							}}
							label={<ArrowBackIcon />}
							onClick={handleOpenNavMenu}
						/>

						<Menu
							id='filterMenu'
							MenuListProps={{
								'aria-labelledby':
									'filterButton',
							}}
							anchorEl={anchorElNav}
							open={navMenuOpen}
							onClose={handleCloseNavMenu}
							slotProps={{
								paper: {
									style: {
										maxHeight:
											ITEM_HEIGHT * 4.5,
										width: '20ch',
									},
								},
							}}
						>
							<div dir='rtl'>
								{categories?.map(
									(category, index) =>
										index > 5 && (
											<Link
												to={`/categories/${category?._id}`}
											>
												<MenuItem
													key={
														category?._id
													}
													onClick={
														handleCloseNavMenu
													}
												>
													{
														category?.name
													}
												</MenuItem>
											</Link>
										),
								)}
							</div>
						</Menu>
					</Tabs>
				</div>
			)}
		</Box>
	);
}
