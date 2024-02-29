import { Box, Container, Typography } from '@mui/material';
import { TBrand } from '../app/store/brand';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect, useRef } from 'react';
import { fetchBrands } from '../controllers/brand';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import BrandCard from './BrandCard';

export default function BrandList({
	listLength = 0,
}: {
	listLength?: number;
}) {
	const dispatch = useAppDispatch();
	const catLength = useRef(listLength);
	const navigate = useNavigate();

	const isHomePage = window.location.href.search('home');

	const brands: (TBrand | null)[] = useAppSelector(
		(state) => state.brands,
	);

	useEffect(() => {
		dispatch(fetchBrands());
		if (catLength.current === 0)
			catLength.current = brands?.length;
	}, [brands?.length, dispatch]);

	return (
		<Container sx={{ mt: 12 }}>
			{brands.length !== 0 && (
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
									color: '#07a180',
									cursor: 'pointer',
									transition:
										'all 200ms ease-in-out',
									'&:hover': {
										color: '#fff',
										backgroundColor:
											'#07a180',
									},
								}}
								onClick={() =>
									navigate('/brands')
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

					{brands.map(
						(brand, index) =>
							index < catLength.current && (
								<BrandCard
									brand={brand}
									key={brand?._id}
								/>
							),
					)}
				</Grid>
			)}
		</Container>
	);
}
