import { Box, Container, Typography } from '@mui/material';
import { TCategory } from '../app/store/category';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect, useRef } from 'react';
import { fetchCategories } from '../controllers/category';
import CategoryCard from './CategoryCard';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function CategoryList({
	listLength = 0,
}: {
	listLength?: number;
}) {
	const dispatch = useAppDispatch();
	const catLength = useRef(listLength);
	const navigate = useNavigate();

	const isHomePage = window.location.href.search('home');

	const categories: (TCategory | null)[] = useAppSelector(
		(state) => state.categories,
	);

	useEffect(() => {
		dispatch(fetchCategories());
		if (catLength.current === 0)
			catLength.current = categories?.length;
	}, [categories?.length, dispatch]);

	return (
		<Container sx={{ mt: 12 }}>
			{categories.length !== 0 && (
				<Grid xs={12} container spacing={0.5}>
					{isHomePage !== -1 && (
						<Grid xs={6} md={2}>
							<Box
								sx={{
									mt: 5,
									width: 100,
									height: 100,
									borderRadius: '50%',
									border: '1px solid #07a180',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									color: 'primary.main',
									cursor: 'pointer',
									transition:
										'all 200ms ease-in-out',
									'&:hover': {
										color: '#fff',
										backgroundColor:
											'primary.main',
									},
								}}
								onClick={() =>
									navigate('/categories')
								}
							>
								<Typography
									sx={{ fontSize: 30 }}
									gutterBottom
								>
									<ArrowBackIcon />
								</Typography>
							</Box>
						</Grid>
					)}

					{categories.map(
						(category, index) =>
							index < catLength.current && (
								<CategoryCard
									category={category}
									key={category?._id}
								/>
							),
					)}
				</Grid>
			)}
		</Container>
	);
}
