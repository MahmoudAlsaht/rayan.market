import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TCategory } from '../../app/store/category';
import { fetchCategories } from '../../controllers/category';
import MobileCategoryCard from './MobileCategoryCard';
import { Box, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
				{categories?.map((category, index) =>
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
				)}
				{isHomePage && categories?.length > 0 && (
					<Grid>
						<Box
							sx={{
								height: '70px',
								width: '70px',
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
							<Typography>
								<ArrowBackIcon
									sx={{
										fontSize: {
											sm: 25,
											md: 35,
										},
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
