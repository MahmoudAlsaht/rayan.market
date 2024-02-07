import { Carousel, Image } from 'react-bootstrap';
import { TProductImage } from '../app/store/product';

import defaultProductImage from '../defaultProductImage.jpg';

type ProductImagesProps = {
	productImages: (TProductImage | null)[];
};

function ProductImageCarousel({
	productImages,
}: ProductImagesProps) {
	return (
		<Carousel className='productImageCarousel'>
			{productImages?.length > 1 ? (
				productImages?.map((productImage) => (
					<Carousel.Item key={productImage?.id}>
						<Image
							className='productImage'
							src={productImage?.path}
						/>
					</Carousel.Item>
				))
			) : (
				<Image
					className='productImage'
					src={
						(productImages &&
							productImages[0]?.path) ||
						defaultProductImage
					}
				/>
			)}
		</Carousel>
	);
}

export default ProductImageCarousel;
