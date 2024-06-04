/* eslint-disable no-mixed-spaces-and-tabs */
import { useParams } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import { TProduct } from '../../app/store/product';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchProduct } from '../../controllers/product';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
import ProductListPreview from '../../components/ProductListPreview';
import { fetchUser } from '../../controllers/user';
import { TUser } from '../../app/auth/auth';
import EditProductForm from '../../components/forms/EditProductForm';

const ShowProduct = memo(() => {
	const { productId } = useParams();
	const [showEditProductForm, setShowEditProductForm] =
		useState(false);

	const handleClickEditProduct = () => {
		setShowEditProductForm(!showEditProductForm);
	};

	const [product, setProduct] = useState<TProduct | null>();
	const [isProductInCart, setIsProductInCart] =
		useState(false);
	const cart: TCart = useAppSelector((state) => state.cart);
	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);

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

		dispatch(
			updateTotalPrice(
				(product?.newPrice as string) ||
					(product?.price as string),
			),
		);
	};

	useEffect(() => {
		dispatch(fetchUser());
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
		dispatch,
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
			{(user.role === 'admin' ||
				user.role === 'editor') && (
				<Button
					variant='contained'
					color='warning'
					sx={{ ml: 2, mt: { sm: 10 } }}
					onClick={handleClickEditProduct}
				>
					تعديل المنتج
				</Button>
			)}

			<EditProductForm
				product={product as TProduct | null}
				show={showEditProductForm}
				handleClose={handleClickEditProduct}
			/>

			<Container sx={{ my: 7, mt: { sm: 20 } }}>
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
												<span>
													{' '}
													أضف للعربة
												</span>
												<ShoppingCartIcon />
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

			<ProductListPreview
				title='منتجات مشابهة'
				sortBasedOn='label'
				productId={productId}
				labelId={
					product?.labels && product?.labels?.length
						? (product?.labels[
								Math.floor(
									Math.random() *
										product?.labels?.length,
								)
						  ]?._id as string)
						: ''
				}
				mb={10}
			/>
		</main>
	);
});

export default ShowProduct;
