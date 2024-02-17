import { useParams } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { memo, useEffect, useState } from 'react';
import {
	TProduct,
	TProductImage,
} from '../../app/store/product';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchProduct } from '../../controllers/product';
import '../../assets/styles/ShowProduct.css';
import { BsCart, BsCheck } from 'react-icons/bs';
import ProductImageCarousel from '../../components/ProductImageCarousel';
import {
	TCart,
	TCartProduct,
	addToCart,
	addToCounter,
	removeFromCounter,
	updateTotalPrice,
} from '../../app/store/cart';
import {
	checkIfProductInCart,
	findCartProduct,
} from '../../controllers/cart';

const ShowProduct = memo(() => {
	const { productId } = useParams();
	const [previewImageUrl, setPreviewImageUrl] =
		useState<TProductImage | null>();
	const [isProductInCart, setIsProductInCart] =
		useState(false);
	const cart: TCart = useAppSelector((state) => state.cart);

	const [product, setProduct] = useState<TProduct | null>();

	const [productCart, setProductCart] =
		useState<TCartProduct | null>();

	const dispatch = useAppDispatch();

	const handleAddProduct = () => {
		if (productCart?.counter == productCart?.quantity)
			return;
		dispatch(
			addToCounter({
				id: productCart?._id as string,
				maxNum: parseInt(
					productCart?.quantity as string,
				),
			}),
		);
		dispatch(updateTotalPrice(productCart?.price as string));
	};

	const handleRemoveProduct = () => {
		if (productCart?.counter === 0) return;
		dispatch(removeFromCounter(productCart?._id as string));
		dispatch(
			updateTotalPrice(-(productCart?.price as string)),
		);
	};

	const handleAddToCart = () => {
		if (product)
			dispatch(
				addToCart({
					_id: productId,
					name: product?.name,
					price: product?.price,
					imageUrl: previewImageUrl?.path as string,
					quantity: product?.quantity,
					counter: 1,
				}),
			);

		dispatch(updateTotalPrice(product?.price as string));
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
		setIsProductInCart(gotProduct);

		setProductCart(
			findCartProduct(
				cart,
				product?._id as string,
			) as TCartProduct,
		);
	}, [
		cart,
		isProductInCart,
		product?._id,
		productCart,
		productId,
		setIsProductInCart,
	]);

	return (
		<Container fluid className='mt-5 mb-5 productContainer'>
			<Row>
				<Col xs={12} lg={6}>
					<ProductImageCarousel
						productImages={
							product?.productImages as (TProductImage | null)[]
						}
					/>
				</Col>
				<Col
					xs={12}
					lg={6}
					className='d-flex flex-column mt-5 mt-md-0 '
				>
					<h3 className='text-muted arb-text'>
						{product?.name}
					</h3>
					<hr className='mb-5' />
					<h4 className='text-muted arb-text'>
						{product?.isOffer ? (
							<span
								style={{
									textDecoration:
										'line-through',
								}}
								className='text-muted'
							>
								{product?.price} JOD
							</span>
						) : (
							`${product?.price} JOD`
						)}
					</h4>
					{product?.isOffer && (
						<h4 className='text-muted arb-text'>
							{product?.newPrice} JOD
						</h4>
					)}
					<h4
						className={`arb-text ${
							parseInt(
								product?.quantity as string,
							) === 0
								? 'text-danger'
								: 'text-muted'
						}`}
					>
						{product?.quantity} متوافر
					</h4>
					<hr className='mb-5' />

					<div className='d-flex flex-column flex-md-row align-items-center'>
						<Button
							size='lg'
							variant={
								isProductInCart ||
								parseInt(
									product?.quantity as string,
								) === 0
									? 'success'
									: 'outline-success'
							}
							style={{ margin: '0 auto' }}
							className='arb-text w-75'
							onClick={handleAddToCart}
							disabled={
								isProductInCart ||
								parseInt(
									product?.quantity as string,
								) === 0
							}
						>
							{!isProductInCart ? (
								<span>
									أضف للعربة
									<BsCart
										className='me-2'
										style={{
											fontSize: '25px',
										}}
									/>
								</span>
							) : (
								<span>
									في العربة
									<BsCheck
										className='me-2'
										style={{
											fontSize: '25px',
										}}
									/>
								</span>
							)}
						</Button>

						{isProductInCart && (
							<div className='d-flex justify-content-around order-first order-md-last'>
								<Button
									size='lg'
									className='m-1'
									onClick={handleRemoveProduct}
									variant='outline-warning'
								>
									-
								</Button>
								<Button
									size='lg'
									className='m-1'
									disabled
									variant='default'
								>
									{productCart?.counter}
								</Button>
								<Button
									size='lg'
									className='m-1'
									onClick={handleAddProduct}
									variant='outline-success'
								>
									+
								</Button>
							</div>
						)}
					</div>
				</Col>
			</Row>
		</Container>
	);
});

export default ShowProduct;
