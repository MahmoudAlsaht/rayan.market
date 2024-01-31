import { useEffect, useState } from 'react';
import { TBanner } from '../app/store/banner';
import { fetchActiveBanner } from '../controllers/banner';
import { DocumentData } from 'firebase/firestore';
import { fetchBannersImages } from '../controllers/bannerImages';
import { Carousel } from 'react-bootstrap';

function Banner() {
	const [banner, setBanner] = useState<TBanner | null>(null);
	const [bannerImages, setBannerImages] = useState<
		DocumentData[] | null
	>(null);

	useEffect(() => {
		const getBanner = async () => {
			const fetchedBanner = await fetchActiveBanner();
			setBanner(fetchedBanner);
		};
		getBanner();
		const updateImages = async () => {
			try {
				const images = await fetchBannersImages(
					banner?.images as string[],
				);
				setBannerImages(images);
			} catch (e: any) {
				console.log(e);
			}
		};
		updateImages();
	}, [banner?.images]);

	return (
		<div>
			{bannerImages && bannerImages!.length < 2 ? (
				bannerImages?.map((image) => (
					<img
						key={image?.id}
						src={image?.path}
						className='banner-image'
					/>
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
								key={image?.id}
							>
								<img
									src={image?.path}
									className='banner-image'
								/>
							</Carousel.Item>
						))}
				</Carousel>
			)}
		</div>
	);
}

export default Banner;
