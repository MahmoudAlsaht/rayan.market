import { useEffect, useState } from 'react';
import { TBanner, TBannerImage } from '../app/store/banner';
import { fetchActiveBanner } from '../controllers/banner';
import { fetchBannersImages } from '../controllers/bannerImages';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { Paper } from '@mui/material';

function Banner() {
	const [banner, setBanner] = useState<TBanner | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [bannerImages, setBannerImages] = useState<
		(TBannerImage | null)[]
	>([]);

	useEffect(() => {
		const getBanner = async () => {
			const fetchedBanner = await fetchActiveBanner();
			setBanner(fetchedBanner);
		};
		getBanner();
		const updateImages = async () => {
			setIsLoading(true);
			try {
				const images = await fetchBannersImages(
					banner?._id as string,
				);
				setBannerImages(images);
				setIsLoading(false);
			} catch (e: any) {
				setIsLoading(false);
				return;
			}
		};
		updateImages();
	}, [banner?._id]);

	return (
		<>
			{bannerImages.length !== 0 && (
				<div>
					{!isLoading ? (
						<Paper className=' mb-3'>
							{bannerImages!.length < 2 ? (
								bannerImages?.map((image) => (
									<Link
										to={image?.link || '#'}
										key={image?._id}
									>
										<div
											style={{
												backgroundColor:
													!image?.path
														? 'none'
														: '#07a180',
												width: '100%',
												height: '300px',
											}}
										>
											<img
												src={image?.path}
												className='banner-image'
												style={{
													width: '100%',
													height: '300px',
													opacity:
														'.85',
												}}
											/>
										</div>
									</Link>
								))
							) : (
								<Carousel
									indicators={false}
									swipe
									fullHeightHover
									animation='slide'
								>
									{bannerImages &&
										bannerImages!.map(
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
																isLoading
																	? 'none'
																	: '#07a180',
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
					) : (
						<Skeleton
							height={311}
							className='mb-3'
						/>
					)}
				</div>
			)}
		</>
	);
}

export default Banner;
