import Carousel from 'react-material-ui-carousel';
import { TProductImage } from '../app/store/product';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Skeleton } from '@mui/material';

type ProductImagesProps = {
	productImages: (TProductImage | null)[];
};

function ProductImageCarousel({
	productImages,
}: ProductImagesProps) {
	return (
		<Carousel
			indicators={false}
			NextIcon={<ArrowBackIosIcon />}
			PrevIcon={<ArrowForwardIosIcon />}
			swipe
			fullHeightHover
			animation='slide'
		>
			{productImages && productImages.length > 0 ? (
				productImages?.map((productImage) => (
					<div key={productImage?._id}>
						<img
							src={productImage?.path}
							width={'100%'}
						/>
					</div>
				))
			) : (
				<div key='no image'>
					<Skeleton height={500} width={500} />
				</div>
			)}
		</Carousel>
	);
}

export default ProductImageCarousel;
