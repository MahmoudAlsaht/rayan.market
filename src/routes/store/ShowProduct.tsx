import { useParams } from 'react-router-dom';
import defaultProductImage from '../../defaultProductImage.jpg';
import {
	Button,
	Col,
	Container,
	Image,
	Row,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { TProduct } from '../../app/store/product';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { DocumentData } from 'firebase/firestore';
import { fetchProducts } from '../../controllers/product';
import { fetchProductsImages } from '../../controllers/productImages';
import '../../assets/styles/ShowProduct.css';
import ProductImageCarousel, {
	TProductImage,
} from '../../components/ProductImageCarousel';
import { BsCart } from 'react-icons/bs';

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
	}, [dispatch, product?.images, productId, products]);

	return (
		<Container fluid>
			<Row>
				<Col xs={12} md={6}>
					{productImages ? (
						<ProductImageCarousel
							productImages={
								productImages as TProductImage[]
							}
						/>
					) : (
						<Image
							className='productImage'
							src={defaultProductImage}
						/>
					)}
				</Col>
				<Col xs={12} md={6} className='mt-5 mt-md-0'>
					<h3 className='text-muted'>
						{product?.name}
					</h3>
					<h4 className='text-muted'>
						{product?.price} JOD
					</h4>
					<hr className='mb-5' />
					<Button
						size='lg'
						variant='outline-primary'
						className='w-100'
					>
						Add To Cart
						<BsCart className='ms-2' />
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default ShowProduct;
