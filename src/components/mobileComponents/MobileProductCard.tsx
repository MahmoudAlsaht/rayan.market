/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardHeader,
	Grid,
	IconButton,
	Paper,
	Skeleton,
	Typography,
} from '@mui/material';
import { TProduct } from '../../app/store/product';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { updateProductViews } from '../../controllers/product';

type MobileProductCardProps = {
	product: TProduct | null;
};

export default function MobileProductCard({
	product,
}: MobileProductCardProps) {
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
										?.optionName
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
									?.type === 'weight'
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
		<Grid xs={6}>
			<Card
				sx={{
					mx: 1,
					mb: 1,
					height: '215px',
					background: 'none',
				}}
			>
				<Link
					to={`/products/${product?._id}`}
					onClick={async () =>
						updateProductViews(
							product?._id as string,
						)
					}
				>
					<Box
						sx={{
							height: '60%',
							width: '85%',
							position: 'relative',
						}}
					>
						{product?.productImage &&
						product?.productImage?.path ? (
							<Avatar
								sx={{
									borderRadius: 0,
									height: 160,
									width: '100%',
									ml: 2,
								}}
								src={product?.productImage?.path}
								alt={`${product?.name}'s image`}
							>
								No Image
							</Avatar>
						) : (
							<Skeleton height={180} />
						)}
						<Paper
							sx={{
								position: 'absolute',
								top: 0,
								right: -17,
								color: 'primary.main',
							}}
						>
							{product?.productType ===
								'options' &&
							product?.productOptions![0].type ===
								'weight' ? (
								<span>
									{
										product?.productOptions![0]
											?.price
									}
									د.أ
								</span>
							) : product?.newPrice ? (
								<span>
									<span
										style={{
											textDecoration:
												'line-through',
											color: 'gray',
											fontSize: 12,
										}}
									>
										{product?.price}د.أ
									</span>
									<br />
									{product?.newPrice}د.أ
								</span>
							) : (
								<span>{product?.price}د.أ</span>
							)}
						</Paper>
					</Box>
					<CardHeader
						title={
							<legend dir='rtl'>
								<Typography
									variant='subtitle1'
									color='primary.main'
									sx={{
										fontSize: 13,
										textAlign: 'center',
										height: 5,
										mt: 2,
									}}
								>
									{product?.name.substring(
										0,
										9,
									)}
								</Typography>
							</legend>
						}
					/>
				</Link>

				<CardActions
					sx={{
						mt: -1,
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					{isProductInCart ? (
						<Box
							sx={{
								display: 'flex',
							}}
						>
							<IconButton
								aria-label='add to product counter'
								onClick={handleAddToCounter}
							>
								<AddCircleIcon
									sx={{ fontSize: 15 }}
								/>
							</IconButton>
							<IconButton
								aria-label='product quantity in cart'
								sx={{
									p: 0,
									fontSize: 15,
								}}
							>
								{productCart?.counter}
							</IconButton>
							<IconButton
								aria-label='remove product from counter'
								onClick={handleRemoveProduct}
							>
								<RemoveCircleIcon
									sx={{ fontSize: 15 }}
								/>
							</IconButton>
						</Box>
					) : (
						<Button
							aria-label='add to cart'
							onClick={handleAddProduct}
							color='secondary'
							variant='outlined'
							fullWidth
						>
							أضف للعربة
							<ShoppingCartIcon
								sx={{ fontSize: 11 }}
							/>
						</Button>
					)}
				</CardActions>
			</Card>
		</Grid>
	);
}
