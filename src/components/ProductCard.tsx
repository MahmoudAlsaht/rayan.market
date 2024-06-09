/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
import { Avatar, Button, Link, Skeleton } from '@mui/material';
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
					name:
						product?.productType === 'options'
							? `${product?.name}-(${
									product?.productOptions![0]
										.optionName
							  })`
							: product?.name,
					price:
						product?.productType === 'options'
							? product?.productOptions![0]
									.type === 'flavor'
								? product?.newPrice ||
								  product?.price
								: product?.productOptions![0]
										?.price
							: product?.newPrice ||
							  product?.price,
					imageUrl: product?.productImage
						?.path as string,
					quantity:
						product?.productType === 'options'
							? product?.productOptions![0]
									.type === 'weight'
								? product?.quantity
								: product?.productOptions![0]
										?.quantity
							: product?.quantity,
					counter: 1,
				}),
			);
			product?.productType === 'options'
				? product?.productOptions![0].type !== 'flavor'
					? dispatch(
							updateTotalPrice(
								product?.productOptions![0]
									?.price as string,
							),
					  )
					: dispatch(
							updateTotalPrice(
								(product?.newPrice as string) ||
									(product?.price as string),
							),
					  )
				: dispatch(
						updateTotalPrice(
							(product?.newPrice as string) ||
								(product?.price as string),
						),
				  );
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
					<CardHeader
						title={product?.name?.substring(0, 10)}
						subheader={
							<legend>
								{product?.productType ===
									'options' &&
								product?.productOptions![0]
									.type === 'weight' ? (
									<p>
										{
											product?.productOptions![0]
												?.price
										}
										د.أ
									</p>
								) : product?.newPrice ? (
									<p>
										<span
											style={{
												textDecoration:
													'line-through',
												color: 'gray',
												fontSize: 15,
											}}
										>
											{product?.price}د.أ
										</span>
										{product?.newPrice}د.أ
									</p>
								) : (
									<p>{product?.price}د.أ</p>
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
						<Button
							aria-label='add to cart'
							onClick={handleAddProduct}
						>
							أضف للعربة
							<ShoppingCartIcon />
						</Button>
					)}
				</CardActions>
			</Card>
		</main>
	);
}
