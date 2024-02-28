import { TCartProduct } from '../app/store/cart';
import { useEffect, useState } from 'react';
import { sumEachProductTotalPrice } from '../utils';
import ProductCartActions from './ProductCartActions';
import { Badge, Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

type CartProductCardProps = {
	product: TCartProduct | null;
};

function CartProductCard({ product }: CartProductCardProps) {
	const [totalProductPrice, setTotalProductPrice] =
		useState(0);

	useEffect(() => {
		setTotalProductPrice(sumEachProductTotalPrice(product!));
	}, [product]);

	return (
		<div dir='rtl' style={{ marginBottom: '10rem' }}>
			<Grid spacing={2} container sx={{ mt: 5 }}>
				<Grid>
					<Badge
						badgeContent={product?.counter}
						color='error'
					>
						{product?.imageUrl ? (
							<img
								src={product?.imageUrl}
								width={200}
								height={200}
							/>
						) : (
							<Skeleton width={200} height={200} />
						)}
					</Badge>
				</Grid>

				<Grid>
					<Typography variant='h5'>
						{product?.name?.substring(0, 45)}
					</Typography>
					<Typography variant='h6'>
						{product?.price} د.أ
					</Typography>
					<Typography variant='h6'>
						{product?.quantity}{' '}
						<span style={{ color: 'gray' }}>
							في المخزون
						</span>
					</Typography>
					<ProductCartActions
						totalProductPrice={totalProductPrice}
						product={product}
					/>
					<span style={{ color: 'gray' }}>
						المجموع:{' '}
						<span>
							{totalProductPrice &&
								totalProductPrice?.toFixed(2)}
						</span>
					</span>{' '}
					د.أ
				</Grid>
			</Grid>
		</div>
	);
}

export default CartProductCard;
