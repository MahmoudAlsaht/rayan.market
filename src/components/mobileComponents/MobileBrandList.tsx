import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TBrand } from '../../app/store/brand';
import { fetchBrands } from '../../controllers/brand';
import MobileBrandCard from './MobileBrandCard';
import { Box, Grid, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

export default function MobileBrandList({
	isHomePage,
}: {
	isHomePage: boolean;
}) {
	const brands: (TBrand | null)[] = useAppSelector(
		(state) => state.brands,
	);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchBrands());
	}, [dispatch]);

	return (
		<main dir='rtl'>
			<Grid container sx={{ mt: 5 }}>
				{brands?.map((brand, index) =>
					isHomePage ? (
						index <= 6 && (
							<MobileBrandCard
								brand={brand}
								key={brand?._id}
							/>
						)
					) : (
						<MobileBrandCard
							brand={brand}
							key={brand?._id}
						/>
					),
				)}
				{isHomePage && brands?.length > 0 && (
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
							onClick={() => navigate('/brands')}
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
