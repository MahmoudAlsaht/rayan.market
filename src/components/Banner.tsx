import { TBanner } from '../app/store/banner';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';
import { Avatar, Box, Paper } from '@mui/material';

function Banner({ banner }: { banner: TBanner | null }) {
	return (
		<>
			{banner?.bannerImages &&
				banner?.bannerImages?.length !== 0 && (
					<Box>
						<Paper sx={{ mb: 3 }}>
							{banner.bannerImages &&
							banner.bannerImages.length < 2 ? (
								banner.bannerImages?.map(
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
									{banner.bannerImages &&
										banner.bannerImages.map(
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
