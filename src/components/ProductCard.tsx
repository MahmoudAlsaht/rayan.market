import { DocumentData } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { fetchProductsImages } from '../controllers/productImages';
import defaultProductImage from '../defaultProductImage.jpg';
import '../assets/styles/ProductCard.css';
import { Link } from 'react-router-dom';

type ProductCardProps = {
	product: DocumentData | undefined;
};

function ProductCard({ product }: ProductCardProps) {
	const [productImages, setProductImages] = useState<
		(DocumentData | undefined)[] | null
	>(null);

	useEffect(() => {
		const getImages = async () => {
			const fetchedImages = await fetchProductsImages(
				product?.images,
			);
			setProductImages(fetchedImages);
		};
		getImages();
	}, [product?.images]);

	return (
		<Container fluid>
			<Card className='productCard mb-5'>
				<Card.Img
					variant='top'
					src={
						(productImages &&
							productImages[0]?.path) ||
						defaultProductImage
					}
				/>
				<Card.Title className='ms-3'>
					<Link to={'#'}>{product?.name}</Link>
				</Card.Title>
				<Card.Subtitle className='text-muted ms-3'>
					{product?.price} JOD
				</Card.Subtitle>
			</Card>
		</Container>
	);
}

export default ProductCard;
