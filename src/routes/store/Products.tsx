/* eslint-disable no-mixed-spaces-and-tabs */
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { memo, useEffect } from 'react';
import { fetchProducts } from '../../controllers/product';
import ProductCard from '../../components/ProductCard';
import { TProduct } from '../../app/store/product';
import { Grid } from '@mui/material';
import MobileProductCard from '../../components/mobileComponents/MobileProductCard';

const Products = memo(() => {
	const dispatch = useAppDispatch();
	const products: (TProduct | null)[] = useAppSelector(
		(state) => state.products,
	);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<main dir='rtl'>
			<Grid
				container
				sx={{
					mt: 2,
					mb: 20,
					display: {
						xs: 'none',
						sm: 'flex',
					},
				}}
			>
				{products &&
					products?.map((product) => (
						<Grid sm={3} md={2} key={product?._id}>
							<ProductCard
								product={product as TProduct}
							/>
						</Grid>
					))}
			</Grid>
			<Grid
				container
				sx={{
					mt: 2,
					mb: 20,
					display: {
						sm: 'none',
					},
				}}
				spacing={1}
			>
				{products.map(
					(product) =>
						parseInt(product?.quantity as string) >
							0 && (
							<MobileProductCard
								product={product}
								key={product?._id}
							/>
						),
				)}
			</Grid>
		</main>
	);
});

export default Products;
