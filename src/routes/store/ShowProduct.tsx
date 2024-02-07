/* eslint-disable no-mixed-spaces-and-tabs */
import { useParams } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import {
	TProduct,
	TProductImage,
} from '../../app/store/product';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchProduct } from '../../controllers/product';
import '../../assets/styles/ShowProduct.css';
import { BsCart } from 'react-icons/bs';
import ProductImageCarousel from '../../components/ProductImageCarousel';
import {
	TCart,
	addToCart,
	addToCounter,
	updateTotalPrice,
} from '../../app/store/cart';
import { checkIfProductInCart } from '../../controllers/cart';

function ShowProduct() {
	const { productId } = useParams();
	const [previewImageUrl, setPreviewImageUrl] =
		useState<TProductImage | null>();
	const [productInCart, setProductInCart] = useState(false);
	const cart: TCart = useAppSelector((state) => state.cart);

	const [product, setProduct] = useState<TProduct | null>();

	const dispatch = useAppDispatch();

	const handleAddToCart = () => {
		if (product) {
			!productInCart
				? dispatch(
						addToCart({
							_id: productId,
							name: product?.name,
							price: product?.price,
							imageUrl:
								previewImageUrl?.path as string,
							quantity: product?.quantity,
							counter: 1,
						}),
				  )
				: dispatch(
						addToCounter({
							id: productId as string,
							maxNum: parseInt(
								product?.price as string,
							),
						}),
				  );
		}
		dispatch(
			updateTotalPrice(parseInt(product?.price as string)),
		);
	};

	useEffect(() => {
		const getProduct = async () => {
			const productData = await fetchProduct(
				productId as string,
			);
			setProduct(productData);
			if (productData?.productImages)
				setPreviewImageUrl(productData.productImages[0]);
		};
		getProduct();

		const gotProduct = checkIfProductInCart(
			cart,
			productId as string,
		) as boolean;
		setProductInCart(gotProduct);
	}, [cart, productId]);

	return (
		<Container fluid className='mt-5'>
			<Row>
				<Col xs={12} md={6}>
					<ProductImageCarousel
						productImages={
							product?.productImages as (TProductImage | null)[]
						}
					/>
				</Col>
				<Col xs={12} md={6} className='mt-5 mt-md-0'>
					<h3 className='text-muted'>
						{product?.name}
					</h3>
					<hr className='mb-5' />
					<h4 className='text-muted'>
						{product?.price} JOD
					</h4>
					<h4 className='text-muted'>
						{product?.quantity} in stock
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
