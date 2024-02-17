import { Pagination } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {
	TCartProduct,
	addToCounter,
	removeFromCounter,
	removeProduct,
	updateTotalPrice,
} from '../app/store/cart';
import { useAppDispatch } from '../app/hooks';

type ProductCartActionsProps = {
	product: TCartProduct | null;
	totalProductPrice: number;
	className?: string;
};

function ProductCartActions({
	product,
	totalProductPrice,
	className,
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
		<Pagination className={`${className}`}>
			<Pagination.Item onClick={handleRemoveProduct}>
				-
			</Pagination.Item>
			<Pagination.Item>{product?.counter}</Pagination.Item>
			<Pagination.Item onClick={handleAddProduct}>
				+
			</Pagination.Item>
			<Link
				to='#'
				className='border p-1'
				onClick={handleDestroyProduct}
			>
				<BsTrash className='text-danger' />
			</Link>
		</Pagination>
	);
}

export default ProductCartActions;
