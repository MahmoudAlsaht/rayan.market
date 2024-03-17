import { useEffect } from 'react';
import { TBanner } from '../app/store/banner';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';
import { Avatar, Box, Paper } from '@mui/material';
import { fetchBanners } from '../controllers/banner';
import { useAppDispatch, useAppSelector } from '../app/hooks';

function Banner() {
	const banners: (TBanner | null)[] = useAppSelector(
		(state) => state.banners,
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchBanners());
	}, [dispatch]);

	return (
		<>
			{banners[0]?.bannerImages &&
				banners[0]?.bannerImages?.length !== 0 && (
					<Box>
						<Paper sx={{ mb: 3 }}>
							{banners[0].bannerImages &&
							banners[0].bannerImages.length <
								2 ? (
								banners[0].bannerImages?.map(
									(image) => (
										<Link
											to={
												image?.link ||
												'#'
											}
											key={image?._id}
										>
											<Paper
												sx={{
													backgroundColor:
														!image?.path
															? 'none'
															: '#07a180',
													width: '100%',
													height: '250px',
												}}
											>
												<Avatar
													src={
														image?.path
													}
													sx={{
														width: '100%',
														height: '250px',
														opacity:
															'.85',
													}}
													variant='square'
												/>
											</Paper>
										</Link>
									),
								)
							) : (
								<Carousel
									indicators={false}
									swipe
									fullHeightHover
									animation='slide'
								>
									{banners[0].bannerImages &&
										banners[0].bannerImages.map(
											(image) => (
												<Link
													key={
														image?._id
													}
													to={
														image?.link ||
														'#'
													}
												>
													<div
														style={{
															backgroundColor:
																'#07a180',
															width: '100%',
															height: '300px',
														}}
													>
														<img
															src={
																image?.path
															}
															style={{
																width: '1200px',
																height: '300px',
															}}
														/>
													</div>
												</Link>
											),
										)}
								</Carousel>
							)}
						</Paper>
					</Box>
				)}
		</>
	);
}

export default Banner;
