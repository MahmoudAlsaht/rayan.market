import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { TProduct } from '../app/store/product';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
	TCart,
	TCartProduct,
	addToCart,
	addToCounter,
	removeFromCounter,
	updateTotalPrice,
} from '../app/store/cart';
import {
	checkIfProductInCart,
	findCartProduct,
} from '../controllers/cart';
import { Avatar, Link, Skeleton } from '@mui/material';
import { updateProductViews } from '../controllers/product';

type ProductCardProps = {
	product: TProduct | null;
};

export default function ProductCard({
	product,
}: ProductCardProps) {
	const [isProductInCart, setIsProductInCart] =
		useState(false);
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
		dispatch(
			updateTotalPrice(
				(productCart?.newPrice as string) ||
					(productCart?.price as string),
			),
		);
	};

	const handleRemoveProduct = () => {
		if (productCart?.counter === 0) return;
		dispatch(removeFromCounter(productCart?._id as string));
		dispatch(
			updateTotalPrice(
				-(
					(productCart?.newPrice as string) ||
					(productCart?.price as string)
				),
			),
		);
	};

	const handleAddProduct = () => {
		if (product && !isProductInCart) {
			dispatch(
				addToCart({
					_id: product?._id,
					name: product?.name,
					price: product?.price,
					imageUrl: product?.productImage
						?.path as string,
					quantity: product?.quantity,
					counter: 1,
				}),
			);
			dispatch(updateTotalPrice(product?.price as string));
		}
	};

	useEffect(() => {
		const gotProduct = checkIfProductInCart(
			cart,
			product?._id as string,
		) as boolean;
		setIsProductInCart(gotProduct);
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
					my: 1,
				}}
			>
				<Link
					sx={{ textDecoration: 'none' }}
					href={`/products/${product?._id}`}
					onClick={async () =>
						updateProductViews(
							product?._id as string,
						)
					}
				>
					{product?.productImage ? (
						<Avatar
							src={product?.productImage?.path}
							sx={{
								height: 194,
								borderRadius: 0,
								width: '100%',
							}}
						>
							No Image
						</Avatar>
					) : (
						<Skeleton height={194} />
					)}
					<CardHeader // action={}
						title={product?.name.substring(0, 10)}
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
				</Link>

				<CardActions disableSpacing>
					{isProductInCart ? (
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
				</CardActions>
			</Card>
		</main>
	);
}
