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
			{productImages ? (
				productImages?.map((productImage) => (
					<Carousel.Item key={productImage?._id}>
						<Image
							className='productImage'
							src={productImage?.path}
						/>
					</Carousel.Item>
				))
			) : (
				<Image
					className='productImage'
					src={defaultProductImage}
				/>
			)}
		</Carousel>
	);
}

export default ProductImageCarousel;
