/* eslint-disable no-mixed-spaces-and-tabs */
import { DocumentData } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { fetchProductsImages } from '../controllers/productImages';
import defaultProductImage from '../defaultProductImage.jpg';
import '../assets/styles/ProductCard.css';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
	TCart,
	TCartProduct,
	addToCart,
	updateTotalPrice,
} from '../app/store/cart';
import { BsCartPlus, BsCheck } from 'react-icons/bs';
import {
	checkIfProductInCart,
	findCartProduct,
} from '../controllers/cart';
import { TProductImage } from '../app/store/product';
import ProductCartActions from './ProductCartActions';
import { sumEachProductTotalPrice } from '../utils';
import Skeleton from 'react-loading-skeleton';

type ProductCardProps = {
	product: DocumentData | undefined;
};

function ProductCard({ product }: ProductCardProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [productImages, setProductImages] =
		useState<(TProductImage | null)[]>();
	const [productInCart, setProductInCart] = useState(false);
	const cart: TCart = useAppSelector((state) => state.cart);
	const [totalProductPrice, setTotalProductPrice] =
		useState(0);
	const [productCart, setProductCart] =
		useState<TCartProduct | null>();

	const dispatch = useAppDispatch();

	const handleAddProduct = () => {
		if (product && !productInCart) {
			dispatch(
				addToCart({
					_id: product?._id,
					name: product?.name,
					price: product?.price,
					imageUrl:
						productImages! &&
						(productImages[0]?.path as string),
					quantity: product?.quantity,
					counter: 1,
				}),
			);
			dispatch(updateTotalPrice(product?.price as string));
		}
	};

	useEffect(() => {
		setIsLoading(true);
		const getImages = async () => {
			const fetchedImages = await fetchProductsImages(
				product?._id,
			);
			setProductImages(fetchedImages);
		};
		getImages();
		const gotProduct = checkIfProductInCart(
			cart,
			product?._id as string,
		) as boolean;
		setProductInCart(gotProduct);
		setProductCart(
			findCartProduct(cart, product?._id) as TCartProduct,
		);
		setTotalProductPrice(
			sumEachProductTotalPrice(productCart!),
		);
		setIsLoading(false);
	}, [cart, product?._id, productCart]);

	return (
		<Container fluid>
			{!isLoading ? (
				<Card className='productCard mb-5 text-center'>
					<Link to={`/store/products/${product?._id}`}>
						<Card.Img
							variant='top'
							src={
								(productImages &&
									productImages[0]?.path) ||
								defaultProductImage
							}
						/>
						<Card.Title className='text-center mt-2 text-muted'>
							{product?.name?.substring(0, 30)}
						</Card.Title>
					</Link>
					<Card.Header>
						{!product?.isOffer ? (
							<Card.Subtitle className='text-muted arb-text'>
								{product?.price} د.أ
							</Card.Subtitle>
						) : (
							<Card.Subtitle className='text-muted arb-text'>
								<span
									style={{
										textDecoration:
											product?.newPrice &&
											'line-through',
									}}
								>
									{product?.price} د.أ
								</span>
								{product?.newPrice && (
									<span className='me-3'>
										{product?.newPrice} د.أ
									</span>
								)}
							</Card.Subtitle>
						)}
					</Card.Header>
					{/* <Card.Body>
					<Card.Text>
						<span
							className={`arb-text ${
								product?.quantity === 0
									? 'text-danger'
									: 'text-success'
							}`}
						>
							{product?.quantity} في المخزون
						</span>
					</Card.Text>
				</Card.Body> */}
					<Card.Footer className='d-flex flex-column align-items-center'>
						<Button
							onClick={handleAddProduct}
							variant={
								product?.quantity === 0
									? 'secondary'
									: productInCart
									? 'success'
									: 'outline-secondary'
							}
							className='arb-text mb-2'
							disabled={
								product?.quantity === 0 ||
								productInCart
							}
						>
							{!productInCart ? (
								<span>
									<BsCartPlus className='footerButtons' />{' '}
								</span>
							) : (
								<span>
									<BsCheck className='footerButtons' />
								</span>
							)}
						</Button>

						{productInCart && (
							<ProductCartActions
								product={
									productCart as TCartProduct
								}
								totalProductPrice={
									totalProductPrice
								}
								className='productAction'
							/>
						)}
					</Card.Footer>
				</Card>
			) : (
				<Skeleton
					height={200}
					width={170}
					style={{ marginTop: '1rem' }}
				/>
			)}
		</Container>
	);
}

export default ProductCard;
