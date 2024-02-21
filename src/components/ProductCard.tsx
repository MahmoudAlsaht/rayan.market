/* eslint-disable no-mixed-spaces-and-tabs */
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
import { TProduct, TProductImage } from '../app/store/product';
import ProductCartActions from './ProductCartActions';
import { sumEachProductTotalPrice } from '../utils';
import Skeleton from 'react-loading-skeleton';

type ProductCardProps = {
	product: TProduct | null;
};

function ProductCard({ product }: ProductCardProps) {
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
		const getImages = async () => {
			const fetchedImages = await fetchProductsImages(
				product?._id as string,
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
			findCartProduct(
				cart,
				product?._id as string,
			) as TCartProduct,
		);
		setTotalProductPrice(
			sumEachProductTotalPrice(productCart!),
		);
	}, [cart, product?._id, productCart]);

	return (
		<Container className='productCardContainer'>
			<Card className='productCard mb-5 text-center w-75'>
				<Link to={`/store/products/${product?._id}`}>
					{productImages ? (
						<Card.Img
							variant='top'
							src={
								productImages[0]?.path ||
								defaultProductImage
							}
						/>
					) : (
						<Skeleton
							height={200}
							style={{ margin: '.5rem' }}
						/>
					)}
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
							<br />
							{product?.newPrice && (
								<span className='me-3'>
									{product?.newPrice} د.أ
								</span>
							)}
						</Card.Subtitle>
					)}
				</Card.Header>
				<Card.Footer className='d-flex flex-column align-items-center'>
					<Button
						onClick={handleAddProduct}
						variant={
							parseInt(
								product?.quantity as string,
							) === 0
								? 'secondary'
								: productInCart
								? 'success'
								: 'outline-secondary'
						}
						className='arb-text mb-2'
						disabled={
							parseInt(
								product?.quantity as string,
							) === 0 || productInCart
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
							product={productCart as TCartProduct}
							totalProductPrice={totalProductPrice}
							className='productAction'
						/>
					)}
				</Card.Footer>
			</Card>
		</Container>
	);
}

export default ProductCard;
