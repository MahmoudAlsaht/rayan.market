import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
	TCartProduct,
	addToCounter,
	removeFromCounter,
	removeProduct,
	updateTotalPrice,
} from '../app/store/cart';
import { useAppDispatch } from '../app/hooks';
import { IconButton } from '@mui/material';

type ProductCartActionsProps = {
	product: TCartProduct | null;
	totalProductPrice: number;
};

function ProductCartActions({
	product,
	totalProductPrice,
}: ProductCartActionsProps) {
	const dispatch = useAppDispatch();

	const handleAddProduct = () => {
		if (product?.counter == product?.quantity) return;
		dispatch(
			addToCounter({
				id: product?._id as string,
				maxNum: parseInt(product?.quantity as string),
			}),
		);
		dispatch(updateTotalPrice(product?.price as string));
	};

	const handleRemoveProduct = () => {
		if (product?.counter === 0) return;
		dispatch(removeFromCounter(product?._id as string));
		dispatch(updateTotalPrice(-(product?.price as string)));
	};

	const handleDestroyProduct = () => {
		dispatch(removeProduct(product?._id as string));
		dispatch(updateTotalPrice(-totalProductPrice));
	};

	return (
		<legend>
			<IconButton
				aria-label='add to product counter'
				onClick={handleAddProduct}
			>
				<AddCircleIcon
					sx={{ fontSize: { xs: 20, md: 27 } }}
				/>
			</IconButton>
			<IconButton
				aria-label='product quantity in cart'
				sx={{ fontSize: { xs: 20, md: 27 }, p: 0 }}
			>
				{product?.counter}
			</IconButton>
			<IconButton
				aria-label='take one product from cart'
				onClick={handleRemoveProduct}
			>
				<RemoveCircleIcon
					sx={{ fontSize: { xs: 20, md: 27 } }}
				/>
			</IconButton>
			<IconButton
				aria-label='remove product from cart'
				onClick={handleDestroyProduct}
			>
				<DeleteIcon
					sx={{
						fontSize: { xs: 20, md: 27 },
						color: 'error.main',
					}}
				/>
			</IconButton>
		</legend>
	);
}

export default ProductCartActions;
