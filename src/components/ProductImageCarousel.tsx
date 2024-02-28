import Carousel from 'react-material-ui-carousel';
import { TProductImage } from '../app/store/product';
import defaultProductImage from '../defaultProductImage.jpg';

type ProductImagesProps = {
	productImages: (TProductImage | null)[];
};

function ProductImageCarousel({
	productImages,
}: ProductImagesProps) {
	return (
		<Carousel
			indicators={false}
			swipe
			fullHeightHover
			animation='slide'
		>
			{productImages && productImages.length > 0 ? (
				productImages?.map((productImage) => (
					<div key={productImage?._id}>
						<img
							src={productImage?.path}
							width={450}
						/>
					</div>
				))
			) : (
				<div key='no image'>
					<img src={defaultProductImage} width={450} />
				</div>
			)}
		</Carousel>
	);
}

export default ProductImageCarousel;
