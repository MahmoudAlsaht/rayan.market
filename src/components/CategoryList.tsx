import { Box, Container, Typography } from '@mui/material';
import { TCategory } from '../app/store/category';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect } from 'react';
import { fetchCategories } from '../controllers/category';
import CategoryCard from './CategoryCard';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function CategoryList() {
	const dispatch = useAppDispatch();

	const categories: (TCategory | null)[] = useAppSelector(
		(state) => state.categories,
	);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<Container>
			<Typography
				variant='h2'
				sx={{ textAlign: 'center', m: 3 }}
			>
				الأقسام
			</Typography>
			<Grid xs={12} container spacing={0.5}>
				<Grid xs={6} md={2}>
					<Box
						sx={{
							width: 150,
							height: 150,
							borderRadius: '50%',
							border: '1px solid #07a180',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#07a180',
							cursor: 'pointer',
							transition: 'all 200ms ease-in-out',
							'&:hover': {
								color: '#fff',
								backgroundColor: '#07a180',
							},
						}}
					>
						<Typography
							sx={{ fontSize: 30 }}
							gutterBottom
						>
							<ArrowBackIcon /> المزيد
						</Typography>
					</Box>
				</Grid>

				{categories.map(
					(category, index) =>
						index < 5 && (
							<CategoryCard
								category={category}
								key={category?._id}
							/>
						),
				)}
			</Grid>
		</Container>
	);
}
