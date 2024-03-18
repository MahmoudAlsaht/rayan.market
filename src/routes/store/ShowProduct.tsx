import { useParams } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import { TProduct } from '../../app/store/product';
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
	Typography,
	Grid,
	Avatar,
	Box,
} from '@mui/material';
import MainMobileNavBar from './MainMobileNavBar';

const ShowProduct = memo(() => {
	const { productId } = useParams();
	const [product, setProduct] = useState<TProduct | null>();
	const [isProductInCart, setIsProductInCart] =
		useState(false);
	const cart: TCart = useAppSelector((state) => state.cart);

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
					imageUrl: product?.productImage
						?.path as string,
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
		<main dir='rtl'>
			<Box sx={{ display: { sm: 'none' } }}>
				<MainMobileNavBar />
			</Box>
			<Container sx={{ my: 7, mt: 20 }}>
				{product !== undefined ? (
					<Grid container>
						<Grid sm={12} md={6}>
							{product?.productImage && (
								<Avatar
									style={{
										borderRadius: 0,
										width: '70%',
										height: '100%',
									}}
									src={
										product?.productImage
											?.path
									}
								>
									No Image
								</Avatar>
							)}
						</Grid>
						<Grid
							sm={12}
							md={6}
							sx={{ ml: { xs: 7, sm: 0 } }}
						>
							<Typography
								variant='h3'
								sx={{
									color: 'primary.main',
									fontSize: 20,
									mt: 5,
									mb: 2,
								}}
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
								sx={{
									color: 'gray',
									fontSize: 20,
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
										fontSize: 20,
									}}
								>
									{product?.newPrice} JOD
								</Typography>
							)}

							<Grid
								container
								sx={{
									mt: 1,
									mb: 10,
								}}
							>
								<Grid xs={12} sm={8}>
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
								</Grid>
								{isProductInCart && (
									<Grid>
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
									</Grid>
								)}
							</Grid>
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
			</Container>
		</main>
	);
});

export default ShowProduct;
