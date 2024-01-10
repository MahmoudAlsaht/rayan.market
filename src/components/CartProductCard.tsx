import { Link } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import {
	TCartProduct,
	addToCounter,
	removeFromCounter,
	removeProduct,
	updateTotalPrice,
} from '../app/store/cart';
import { Badge, Image, Pagination } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { sumEachProductTotalPrice } from '../utils';

type CartProductCardProps = {
	product: TCartProduct | null;
	type?: string;
};

function CartProductCard({
	product,
	type,
}: CartProductCardProps) {
	const dispatch = useAppDispatch();
	const [totalProductPrice, setTotalProductPrice] =
		useState(0);

	useEffect(() => {
		setTotalProductPrice(sumEachProductTotalPrice(product!));
	}, [product]);

	const handleAddProduct = () => {
		dispatch(
			addToCounter({
				id: product?.id as string,
				maxNum: parseInt(product?.price as string),
			}),
		);
		dispatch(
			updateTotalPrice(parseInt(product?.price as string)),
		);
	};

	const handleRemoveProduct = () => {
		dispatch(removeFromCounter(product?.id as string));
		dispatch(
			updateTotalPrice(
				-parseInt(product?.price as string),
			),
		);
	};

	const handleDestroyProduct = () => {
		dispatch(removeProduct(product?.id as string));
		dispatch(updateTotalPrice(-totalProductPrice));
	};

	return (
		<>
			<div className='cartContainer'>
				<div>
					<Image
						src={product?.imageUrl}
						className='imageProduct'
					/>

					<Badge className='imageBadge'>
						{product?.counter}
					</Badge>
				</div>

				<div className='productInfo'>
					<h6>{product?.name?.substring(0, 52)}</h6>
					<h6>{product?.price} JOD</h6>
					{type !== 'cartSummary' && (
						<h6>
							{product?.quantity}{' '}
							<span className='text-muted'>
								In stock
							</span>
						</h6>
					)}
					{type !== 'cartSummary' && (
						<Pagination>
							<Pagination.Item
								onClick={handleRemoveProduct}
							>
								-
							</Pagination.Item>
							<Pagination.Item>
								{product?.counter}
							</Pagination.Item>
							<Pagination.Item
								onClick={handleAddProduct}
							>
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
					)}
					<span className='text-muted'>
						Total Price:{' '}
						<span className='text-dark'>
							{totalProductPrice}
						</span>
					</span>{' '}
					JD
				</div>
			</div>
		</>
	);
}

export default CartProductCard;
