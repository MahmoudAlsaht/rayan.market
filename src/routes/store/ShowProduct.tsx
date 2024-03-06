import { useParams } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import {
	TProduct,
	TProductImage,
} from '../../app/store/product';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchProduct } from '../../controllers/product';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckIcon from '@mui/icons-material/Check';
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
import {
	Button,
	Container,
	Divider,
	IconButton,
	Skeleton,
	Stack,
	Typography,
	Grid,
	Avatar,
} from '@mui/material';

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
		<Container sx={{ my: 7 }}>
			<main dir='rtl'>
				{product !== undefined ? (
					<Grid container>
						<Grid sm={12} md={6}>
							{product?.productImages &&
							product.productImages.length ===
								0 ? (
								<Avatar
									sx={{
										borderRadius: 0,
										width: '100%',
										height: '100%',
									}}
									src={
										product?.productImages[0]
											?.path
									}
									alt=''
								/>
							) : (
								<div key='no image'>
									<Skeleton
										height={350}
										width={300}
										sx={{
											mt: -14,
											ml: -0.5,
										}}
									/>
								</div>
							)}
						</Grid>
						<Grid sm={12} md={6}>
							<Typography
								variant='h3'
								sx={{ color: 'primary.main' }}
							>
								{product?.name}
							</Typography>
							<Divider
								sx={{
									mb: 3,
								}}
							/>
							<Typography
								variant='h4'
								style={{
									color: 'gray',
								}}
							>
								{product?.isOffer ? (
									<span
										style={{
											textDecoration:
												'line-through',
										}}
									>
										{product?.price} JOD
									</span>
								) : (
									`${product?.price} JOD`
								)}
							</Typography>
							{product?.isOffer && (
								<Typography
									variant='h4'
									sx={{
										color: 'gray',
									}}
								>
									{product?.newPrice} JOD
								</Typography>
							)}
							<Typography
								variant='h4'
								sx={{
									color:
										parseInt(
											product?.quantity as string,
										) !== 0
											? 'gray'
											: 'error.main',
								}}
							>
								{product?.quantity} متوافر
							</Typography>
							<Divider
								sx={{
									mb: 3,
								}}
							/>

							<Stack direction='row'>
								<Button
									variant='outlined'
									fullWidth
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
											<AddShoppingCartIcon />
										</span>
									) : (
										<span>
											في العربة
											<CheckIcon />
										</span>
									)}
								</Button>

								{isProductInCart && (
									<legend>
										<IconButton
											aria-label='add to product counter'
											onClick={
												handleAddProduct
											}
										>
											<AddCircleIcon />
										</IconButton>
										<IconButton aria-label='product quantity in cart'>
											{
												productCart?.counter
											}
										</IconButton>
										<IconButton
											aria-label='take one product from cart'
											onClick={
												handleRemoveProduct
											}
										>
											<RemoveCircleIcon />
										</IconButton>
									</legend>
								)}
							</Stack>
						</Grid>
					</Grid>
				) : (
					<Grid container>
						<Grid xs={12} lg={6}>
							<Skeleton height={470} />
						</Grid>
						<Grid xs={12} lg={6}>
							<Skeleton height={60} />
						</Grid>
					</Grid>
				)}
			</main>
		</Container>
	);
});

export default ShowProduct;
