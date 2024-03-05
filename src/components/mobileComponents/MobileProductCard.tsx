import {
	Box,
	Button,
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	Grid,
	IconButton,
	Skeleton,
	Typography,
} from '@mui/material';
import {
	TProduct,
	TProductImage,
} from '../../app/store/product';
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
import { fetchProductsImages } from '../../controllers/productImages';
import {
	checkIfProductInCart,
	findCartProduct,
} from '../../controllers/cart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MobileShowProduct from './MobileShowProduct';

type MobileProductCardProps = {
	product: TProduct | null;
};

export default function MobileProductCard({
	product,
}: MobileProductCardProps) {
	const [productImages, setProductImages] =
		useState<(TProductImage | null)[]>();
	const [isProductInCart, setisProductInCart] =
		useState(false);
	const cart: TCart = useAppSelector((state) => state.cart);
	const [productCart, setProductCart] =
		useState<TCartProduct | null>();

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

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
		if (product && !isProductInCart) {
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
		setisProductInCart(gotProduct);
		setProductCart(
			findCartProduct(
				cart,
				product?._id as string,
			) as TCartProduct,
		);
	}, [cart, product?._id]);

	return (
		<Grid xs={4} spacing={1}>
			<Card
				sx={{
					my: 1,
					height: '160px',
					background: 'none',
				}}
			>
				<legend
					onClick={() => handleClickOpen()}
					style={{ cursor: 'pointer' }}
				>
					{productImages && productImages[0]?.path ? (
						<CardMedia
							component='img'
							height={60}
							image={productImages[0]?.path}
							alt={`${product?.name}'s image`}
						/>
					) : (
						<Skeleton height={60} />
					)}
					<CardHeader
						title={
							<legend dir='rtl'>
								<Typography
									variant='subtitle1'
									color='primary.main'
									sx={{
										fontSize: 11,
									}}
								>
									{product?.name.substring(
										0,
										9,
									)}
								</Typography>
								<Typography
									variant='subtitle2'
									color='secondary.main'
									sx={{
										fontSize: 11,
										textAlign: 'center',
										height: 12,
									}}
								>
									{product?.isOffer ? (
										<div>
											<span
												style={{
													textDecoration:
														'line-through',
													color: 'gray',
													fontSize: 12,
												}}
											>
												{product?.price}
												د.أ{' '}
											</span>
											<br />
											{product?.newPrice}
											د.أ{' '}
										</div>
									) : (
										<span>
											{product?.price}
											د.أ{' '}
										</span>
									)}
								</Typography>
							</legend>
						}
					/>
				</legend>

				<CardActions>
					{isProductInCart ? (
						<Box sx={{ display: 'flex' }}>
							<IconButton
								aria-label='add to product counter'
								onClick={handleAddToCounter}
							>
								<AddCircleIcon
									sx={{ fontSize: 11 }}
								/>
							</IconButton>
							<IconButton
								aria-label='product quantity in cart'
								sx={{ p: 0, fontSize: 11 }}
							>
								{productCart?.counter}
							</IconButton>
							<IconButton
								aria-label='remove product from counter'
								onClick={handleRemoveProduct}
							>
								<RemoveCircleIcon
									sx={{ fontSize: 11 }}
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
							<AddShoppingCartIcon
								sx={{ fontSize: 11 }}
							/>
						</Button>
					)}
				</CardActions>
			</Card>

			<MobileShowProduct
				product={product}
				open={open}
				onClose={handleClose}
				handleAddProduct={handleAddToCounter}
				handleAddToCart={handleAddProduct}
				handleRemoveProduct={handleRemoveProduct}
				productCart={productCart}
				isProductInCart={isProductInCart}
			/>
		</Grid>
	);
}
