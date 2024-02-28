import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, {
	IconButtonProps,
} from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { TProduct, TProductImage } from '../app/store/product';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
	TCart,
	TCartProduct,
	addToCart,
	addToCounter,
	removeFromCounter,
	updateTotalPrice,
} from '../app/store/cart';
import { fetchProductsImages } from '../controllers/productImages';
import {
	checkIfProductInCart,
	findCartProduct,
} from '../controllers/cart';
import { Skeleton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

type ProductCardProps = {
	product: TProduct | null;
};

export default function ProductCard({
	product,
}: ProductCardProps) {
	const navigate = useNavigate();
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const [productImages, setProductImages] =
		useState<(TProductImage | null)[]>();
	const [productInCart, setProductInCart] = useState(false);
	const cart: TCart = useAppSelector((state) => state.cart);
	const [productCart, setProductCart] =
		useState<TCartProduct | null>();

	const dispatch = useAppDispatch();

	const handleAddToCounter = () => {
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
	}, [cart, product?._id]);

	return (
		<main dir='rtl'>
			<Card
				sx={{
					maxWidth: 340,
					mb: 2,
				}}
			>
				{productImages ? (
					<CardMedia
						component='img'
						height='194'
						image={productImages[0]?.path}
						alt={`${product?.name}'s image`}
						sx={{ cursor: 'pointer' }}
						onClick={() =>
							navigate(
								`/store/products/${product?._id}`,
							)
						}
					/>
				) : (
					<Skeleton height={300} />
				)}
				<CardHeader
					action={
						<Typography sx={{ color: 'gray' }}>
							{product?.quantity}
						</Typography>
					}
					title={product?.name}
					subheader={
						<legend>
							{product?.newPrice ? (
								<p>
									<span
										style={{
											textDecoration:
												'line-through',
											color: 'gray',
											fontSize: 15,
										}}
									>
										{product?.price}JOD
									</span>
									{product?.newPrice}JOD
								</p>
							) : (
								<p>{product?.price}JOD</p>
							)}
						</legend>
					}
				/>

				<CardActions disableSpacing>
					<ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label='show more'
					>
						<ExpandMoreIcon />
					</ExpandMore>
				</CardActions>

				<Collapse
					in={expanded}
					timeout='auto'
					unmountOnExit
				>
					{productInCart ? (
						<legend>
							<IconButton
								aria-label='add to product counter'
								onClick={handleAddToCounter}
							>
								<AddCircleIcon />
							</IconButton>
							<IconButton aria-label='product quantity in cart'>
								{productCart?.counter}
							</IconButton>
							<IconButton
								aria-label='remove product from counter'
								onClick={handleRemoveProduct}
							>
								<RemoveCircleIcon />
							</IconButton>
						</legend>
					) : (
						<IconButton
							aria-label='add to cart'
							onClick={handleAddProduct}
						>
							<AddShoppingCartIcon />
						</IconButton>
					)}
				</Collapse>
			</Card>
		</main>
	);
}
