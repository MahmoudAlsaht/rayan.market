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
		setIsLoading(true);
		const getBanner = async () => {
			const fetchedBanner = await fetchActiveBanner();
			setBanner(fetchedBanner);
		};
		getBanner();
		const updateImages = async () => {
			try {
				const images = await fetchBannersImages(
					banner?._id as string,
				);
				setBannerImages(images);
			} catch (e: any) {
				return;
			}
		};
		updateImages();
		setIsLoading(false);
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
													'#07a180',
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
														'.9',
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
													<img
														src={
															image?.path
														}
														style={{
															width: '1200px',
															height: '300px',
														}}
													/>
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
