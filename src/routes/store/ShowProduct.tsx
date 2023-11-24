import { useParams } from 'react-router-dom';
import defaultProductImage from '../../defaultProductImage.jpg';
import { Col, Image, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { TProduct } from '../../app/store/product';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { DocumentData } from 'firebase/firestore';
import { fetchProducts } from '../../controllers/product';
import { fetchProductsImages } from '../../controllers/productImages';

function ShowProduct() {
	const { productId } = useParams();
	const [product, setProduct] = useState<
		TProduct | undefined
	>();
	const [productImages, setProductImages] = useState<
		(DocumentData | undefined)[] | null
	>(null);

	const dispatch = useAppDispatch();
	const products: (DocumentData | null)[] = useAppSelector(
		(state) => state.products,
	);

	useEffect(() => {
		dispatch(fetchProducts());
		setProduct(() => {
			return products?.filter(
				(product) =>
					productId === product?.id && product,
			)[0] as TProduct;
		});
		const getImages = async () => {
			const fetchedImages = await fetchProductsImages(
				product?.images as string[],
			);
			setProductImages(fetchedImages);
		};
		getImages();
	}, [productId, products, dispatch, product?.images]);

	return (
		<Row>
			<Col xs={6}>
				{product?.name}

				<Image
					src={
						(productImages &&
							productImages[0]?.path) ||
						defaultProductImage
					}
				/>
			</Col>
		</Row>
	);
}

export default ShowProduct;
