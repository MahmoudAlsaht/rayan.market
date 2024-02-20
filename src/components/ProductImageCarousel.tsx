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
			{productImages && productImages.length > 0 ? (
				productImages?.map((productImage) => (
					<Carousel.Item key={productImage?._id}>
						<Image
							className='productImage'
							src={productImage?.path}
							width={450}
						/>
					</Carousel.Item>
				))
			) : (
				<Carousel.Item key='no image'>
					<Image
						className='productImage'
						src={defaultProductImage}
						width={450}
					/>
				</Carousel.Item>
			)}
		</Carousel>
	);
}

export default ProductImageCarousel;
