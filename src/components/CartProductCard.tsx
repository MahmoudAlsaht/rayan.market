import { TCartProduct } from '../app/store/cart';
import { useEffect, useState } from 'react';
import { sumEachProductTotalPrice } from '../utils';
import ProductCartActions from './ProductCartActions';
import {
	Avatar,
	Badge,
	Box,
	Skeleton,
	Typography,
} from '@mui/material';
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
		<div dir='rtl'>
			<Box sx={{ mb: { xs: 5, md: 10 } }}>
				<Grid spacing={2} container sx={{ mt: 5 }}>
					<Grid>
						<Badge
							badgeContent={product?.counter}
							color='error'
						>
							{product?.imageUrl ? (
								<Avatar
									sx={{
										borderRadius: 0,
										width: {
											xs: 90,
											md: 200,
										},
										height: {
											xs: 90,
											md: 200,
										},
									}}
									src={product?.imageUrl}
								>
									No Image Available
								</Avatar>
							) : (
								<Skeleton
									sx={{
										width: {
											xs: 90,
											md: 200,
										},
										height: {
											xs: 90,
											md: 200,
										},
									}}
								/>
							)}
						</Badge>
					</Grid>

					<Grid>
						<Typography
							variant='h5'
							sx={{ fontSize: 17 }}
						>
							{product?.name?.substring(0, 30)}
						</Typography>
						<Typography
							variant='h6'
							sx={{ fontSize: 17 }}
						>
							{product?.price} د.أ
						</Typography>
						<Typography
							variant='h6'
							sx={{ fontSize: 17 }}
						>
							{product?.quantity}{' '}
							<span style={{ color: 'gray' }}>
								في المخزون
							</span>
						</Typography>
						<ProductCartActions
							totalProductPrice={totalProductPrice}
							product={product}
						/>
						<span
							style={{
								color: 'gray',
								fontSize: 17,
							}}
						>
							المجموع:{' '}
							<span>
								{totalProductPrice &&
									totalProductPrice?.toFixed(
										2,
									)}
							</span>
						</span>{' '}
						د.أ
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}

export default CartProductCard;
