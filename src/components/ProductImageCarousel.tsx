import { Carousel, Image } from 'react-bootstrap';
import { TProduct } from '../app/store/product';
import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { fetchProductsImages } from '../controllers/productImages';
import defaultProductImage from '../defaultProductImage.jpg';

export type TProductImage = {
	id: string;
	product: string;
	path: string;
	filename: string;
};

type ProductImagesProps = {
	product: TProduct;
	setImageUrl: (url: string) => void;
};

function ProductImageCarousel({
	product,
	setImageUrl,
}: ProductImagesProps) {
	const [productImages, setProductImages] = useState<
		(DocumentData | undefined)[] | null
	>(null);

	useEffect(() => {
		const getImages = async () => {
			const fetchedImages = await fetchProductsImages(
				product?.images as string[],
			);
			await setProductImages(fetchedImages);
			if (productImages)
				setImageUrl(productImages[0]?.path);
		};
		getImages();
	}, [product?.images, productImages, setImageUrl]);

	return (
		<Carousel className='productImageCarousel'>
			{productImages?.length ? (
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
					src={defaultProductImage}
				/>
			)}
		</Carousel>
	);
}

export default ProductImageCarousel;
