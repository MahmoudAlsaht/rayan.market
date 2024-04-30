/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TCategory } from '../../app/store/category';
import { fetchCategories } from '../../controllers/category';
import MobileCategoryCard from './MobileCategoryCard';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

export default function MobileCategoryList({
	isHomePage,
}: {
	isHomePage: boolean;
}) {
	const categories: (TCategory | null)[] = useAppSelector(
		(state) => state.categories,
	);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<main dir='rtl'>
			<Grid container sx={{ mt: 5 }}>
				{categories != null
					? categories?.map((category, index) =>
							isHomePage ? (
								index <= 6 && (
									<MobileCategoryCard
										category={category}
										key={category?._id}
									/>
								)
							) : (
								<MobileCategoryCard
									category={category}
									key={category?._id}
								/>
							),
					  )
					: [1, 2, 3, 4, 5, 6].map(() => (
							<Skeleton
								sx={{ mt: 3, ml: 2 }}
								variant='circular'
								width='70px'
								height='70px'
							/>
					  ))}
				{isHomePage && categories?.length > 0 && (
					<Grid>
						<Box
							sx={{
								mt: 3,
								ml: 2,
								height: '40px',
								width: '40px',
								borderRadius: '50%',
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
							<Typography>
								<ArrowBackIosIcon
									sx={{
										fontSize: 15,
									}}
								/>
							</Typography>
						</Box>
					</Grid>
				)}
			</Grid>
		</main>
	);
}
