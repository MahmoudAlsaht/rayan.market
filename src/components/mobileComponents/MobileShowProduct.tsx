import {
	AppBar,
	Button,
	Dialog,
	DialogContent,
	Divider,
	Grid,
	IconButton,
	Skeleton,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material';
import { TProduct } from '../../app/store/product';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { ReactElement, Ref, forwardRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckIcon from '@mui/icons-material/Check';
import { TCartProduct } from '../../app/store/cart';

type MobileShowProductProps = {
	product: TProduct | null;
	open: boolean;
	onClose: () => void;
	handleAddProduct: () => void;
	handleRemoveProduct: () => void;
	handleAddToCart: () => void;
	isProductInCart: boolean;
	productCart: TCartProduct | null | undefined;
};

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: ReactElement;
	},
	ref: Ref<unknown>,
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function MobileShowProduct({
	product,
	open,
	onClose,
	handleAddProduct,
	handleRemoveProduct,
	handleAddToCart,
	isProductInCart,
	productCart,
}: MobileShowProductProps) {
	return (
		<main dir='rtl'>
			<Dialog
				fullScreen
				onClose={onClose}
				open={open}
				TransitionComponent={Transition}
				dir='rtl'
			>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<IconButton
							edge='end'
							color='inherit'
							onClick={onClose}
							aria-label='close'
						>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>

				<DialogContent>
					{product !== undefined ? (
						<Grid container>
							<Grid sm={12}>
								{product?.productImages ? (
									<img
										src={
											product
												?.productImages[0]
												?.path
										}
										alt={`${product?.name}'s image`}
										width='100%'
									/>
								) : (
									<Skeleton width='100%' />
								)}
							</Grid>
							<Grid sm={12}>
								<Typography
									variant='h3'
									sx={{
										color: 'primary.main',
										my: 3,
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

								<Stack
									direction='column'
									alignItems='center'
								>
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
				</DialogContent>
			</Dialog>
		</main>
	);
}
