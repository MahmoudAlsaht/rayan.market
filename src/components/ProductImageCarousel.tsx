import { Carousel, Image } from 'react-bootstrap';

export type TProductImage = {
	id: string;
	product: string;
	path: string;
	filename: string;
};
type ProductImagesProps = {
	productImages: TProductImage[];
};

function ProductImageCarousel({
	productImages,
}: ProductImagesProps) {
	return (
		<Carousel className='productImageCarousel'>
			{productImages.map((productImage) => (
				<Carousel.Item key={productImage?.id}>
					<Image
						className='productImage'
						src={productImage?.path}
					/>
				</Carousel.Item>
			))}
		</Carousel>
	);
}

export default ProductImageCarousel;
