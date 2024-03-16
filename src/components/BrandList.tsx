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
				<Grid xs={12} container>
					{brands.map(
						(brand, index) =>
							index < catLength.current && (
								<BrandCard
									brand={brand}
									key={brand?._id}
								/>
							),
					)}
					{isHomePage !== -1 && (
						<Grid>
							<Box
								sx={{
									mt: 5,
									width: {
										sm: 50,
										lg: 70,
									},
									height: {
										sm: 50,
										lg: 70,
									},
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
									navigate('/brands')
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
			)}
		</Container>
	);
}
