/* eslint-disable no-mixed-spaces-and-tabs */
import { useParams } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { TProduct } from '../../app/store/product';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { DocumentData } from 'firebase/firestore';
import { fetchProducts } from '../../controllers/product';
import '../../assets/styles/ShowProduct.css';
import { BsCart } from 'react-icons/bs';
import ProductImageCarousel from '../../components/ProductImageCarousel';
import {
	TCart,
	addToCart,
	addToCounter,
} from '../../app/store/cart';
import { checkIfProductInCart } from '../../controllers/cart';

function ShowProduct() {
	const { productId } = useParams();
	const [previewImageUrl, setPreviewImageUrl] = useState('');
	const [productInCart, setProductInCart] = useState(false);
	const cart: TCart = useAppSelector((state) => state.cart);

	const [product, setProduct] = useState<
		TProduct | undefined
	>();

	const dispatch = useAppDispatch();
	const products: (DocumentData | null)[] = useAppSelector(
		(state) => state.products,
	);

	const handleAddToCart = () => {
		if (product) {
			!productInCart
				? dispatch(
						addToCart({
							id: product?.id,
							name: product?.name,
							price: product?.price,
							imageUrl: previewImageUrl,
							quantity: product?.quantity,
							counter: 1,
						}),
				  )
				: dispatch(
						addToCounter({
							id: product?.id as string,
							maxNum: parseInt(
								product?.price as string,
							),
						}),
				  );
		}
	};
	const handlePreviewImageUrl = (url: any) => {
		setPreviewImageUrl(url);
	};

	useEffect(() => {
		dispatch(fetchProducts());
		setProduct(() => {
			return products?.filter(
				(product) =>
					productId === product?.id && product,
			)[0] as TProduct;
		});
		const gotProduct = checkIfProductInCart(
			cart,
			productId as string,
		) as boolean;
		setProductInCart(gotProduct);
	}, [cart, dispatch, productId, products]);

	return (
		<Container fluid>
			<Row>
				<Col xs={12} md={6}>
					<ProductImageCarousel
						product={product as TProduct}
						setImageUrl={handlePreviewImageUrl}
					/>
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
						onClick={handleAddToCart}
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
