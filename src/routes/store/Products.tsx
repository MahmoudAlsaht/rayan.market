/* eslint-disable no-mixed-spaces-and-tabs */
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { memo, useEffect } from 'react';
import { fetchProducts } from '../../controllers/product';
import ProductCard from '../../components/ProductCard';
import { TProduct } from '../../app/store/product';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

const Products = memo(() => {
	const dispatch = useAppDispatch();
	const products: (TProduct | null)[] = useAppSelector(
		(state) => state.products,
	);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<div>
			<Grid container spacing={1} sx={{ mt: 2 }}>
				{products &&
					products?.map((product) => (
						<Grid
							key={product?._id}
							xs={6}
							sm={4}
							md={3}
							lg={2}
						>
							<ProductCard
								product={product as TProduct}
							/>
						</Grid>
					))}
			</Grid>
		</div>
	);
});

export default Products;
