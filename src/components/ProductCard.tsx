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
	addToCart,
	updateTotalPrice,
} from '../app/store/cart';
import { BsCartPlus, BsCheck } from 'react-icons/bs';
import { checkIfProductInCart } from '../controllers/cart';
import { TProductImage } from '../app/store/product';

type ProductCardProps = {
	product: DocumentData | undefined;
};

function ProductCard({ product }: ProductCardProps) {
	const [productImages, setProductImages] =
		useState<(TProductImage | null)[]>();
	const [productInCart, setProductInCart] = useState(false);
	const cart: TCart = useAppSelector((state) => state.cart);

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
			dispatch(
				updateTotalPrice(
					parseInt(product?.price as string),
				),
			);
		}
	};

	useEffect(() => {
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
	}, [cart, product?._id]);

	return (
		<Container fluid>
			<Card className='productCard mb-5'>
				<Link to={`/store/products/${product?._id}`}>
					<Card.Img
						variant='top'
						src={
							(productImages &&
								productImages[0]?.path) ||
							defaultProductImage
						}
					/>
					<Card.Title className='ms-3 mt-1'>
						{product?.name.substring(0, 45)}
					</Card.Title>
				</Link>
				<Card.Header>
					{!product?.isOffer ? (
						<Card.Subtitle className='text-muted'>
							{product?.price} JOD
						</Card.Subtitle>
					) : (
						<Card.Subtitle className='text-muted'>
							<span
								className='me-3'
								style={{
									textDecoration:
										product?.newPrice &&
										'line-through',
								}}
							>
								{product?.price} JOD
							</span>
							<span>
								{product?.newPrice &&
									`${product?.newPrice} JOD`}{' '}
							</span>
						</Card.Subtitle>
					)}
					<Card.Text className='float-end'>
						<Button
							onClick={handleAddProduct}
							variant='outline-secondary'
							className='border-0'
							disabled={
								product?.quantity === 0 ||
								productInCart
							}
						>
							{!productInCart ? (
								<BsCartPlus
									style={{
										fontSize: '20px',
									}}
								/>
							) : (
								<span>
									<BsCheck
										style={{
											fontSize: '20px',
										}}
									/>{' '}
									in cart
								</span>
							)}
						</Button>
					</Card.Text>
					<Card.Text
						className={
							product?.quantity === 0
								? 'text-danger'
								: 'text-success'
						}
					>
						{product?.quantity} in stock
					</Card.Text>
				</Card.Header>
			</Card>
		</Container>
	);
}

export default ProductCard;
