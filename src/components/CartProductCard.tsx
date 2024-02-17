import { TCartProduct } from '../app/store/cart';
import { Badge, Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { sumEachProductTotalPrice } from '../utils';
import ProductCartActions from './ProductCartActions';
import defaultProductImage from '../defaultProductImage.jpg';

type CartProductCardProps = {
	product: TCartProduct | null;
	type?: string;
};

function CartProductCard({
	product,
	type,
}: CartProductCardProps) {
	const [totalProductPrice, setTotalProductPrice] =
		useState(0);

	useEffect(() => {
		setTotalProductPrice(sumEachProductTotalPrice(product!));
	}, [product]);

	return (
		<>
			<div className='cartContainer'>
				<div>
					<Image
						src={
							product?.imageUrl ||
							defaultProductImage
						}
						className='imageProduct'
					/>

					<Badge className='imageBadge'>
						{product?.counter}
					</Badge>
				</div>

				<div className='productInfo'>
					<h6>{product?.name?.substring(0, 45)}</h6>
					<h6>{product?.price} د.أ</h6>
					{type !== 'cartSummary' && (
						<h6>
							{product?.quantity}{' '}
							<span className='text-muted'>
								في المخزون
							</span>
						</h6>
					)}
					{type !== 'cartSummary' && (
						<ProductCartActions
							totalProductPrice={totalProductPrice}
							product={product}
						/>
					)}
					<span className='text-muted'>
						المجموع:{' '}
						<span className='text-dark'>
							{totalProductPrice &&
								totalProductPrice?.toFixed(2)}
						</span>
					</span>{' '}
					د.أ
				</div>
			</div>
		</>
	);
}

export default CartProductCard;
