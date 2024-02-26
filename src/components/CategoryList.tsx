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

	const categories: (TCategory | null)[] = useAppSelector(
		(state) => state.categories,
	);

	useEffect(() => {
		dispatch(fetchCategories());
		if (catLength.current === 0)
			catLength.current = categories?.length;
	}, [categories?.length, dispatch]);

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
						onClick={() => navigate('/categories')}
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
						index < catLength.current && (
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
