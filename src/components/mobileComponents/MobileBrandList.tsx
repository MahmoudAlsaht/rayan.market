import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TBrand } from '../../app/store/brand';
import { fetchBrands } from '../../controllers/brand';
import MobileBrandCard from './MobileBrandCard';
import { Box, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
							onClick={() => navigate('/brands')}
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
