import { useEffect, useState } from 'react';
import { TBanner, TBannerImage } from '../app/store/banner';
import { fetchActiveBanner } from '../controllers/banner';
import { fetchBannersImages } from '../controllers/bannerImages';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

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
				console.log(e);
			}
		};
		updateImages();
		setIsLoading(false);
	}, [banner?._id]);

	return (
		<>
			{!isLoading ? (
				<div className='w-100 mb-3'>
					{bannerImages && bannerImages!.length < 2 ? (
						bannerImages?.map((image) => (
							<Link
								to={image?.link || '#'}
								key={image?._id}
							>
								<img
									src={image?.path}
									className='banner-image'
								/>
							</Link>
						))
					) : (
						<Carousel
							className='banner-carousel'
							controls={false}
						>
							{bannerImages &&
								bannerImages!.map((image) => (
									<Carousel.Item
										interval={2000}
										key={image?._id}
									>
										<Link
											to={
												image?.link ||
												'#'
											}
										>
											<img
												src={image?.path}
												className='banner-image'
											/>
										</Link>
									</Carousel.Item>
								))}
						</Carousel>
					)}
				</div>
			) : (
				<Skeleton height={250} className='mb-3' />
			)}
		</>
	);
}

export default Banner;
