import { Container, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TProduct } from '../../app/store/product';
import { useEffect } from 'react';
import { fetchProducts } from '../../controllers/product';
import MobileProductCard from './MobileProductCard';

export default function MobileProducts() {
	const dispatch = useAppDispatch();
	const products: (TProduct | null)[] = useAppSelector(
		(state) => state.products,
	);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<main dir='rtl'>
			<Container sx={{ mt: 2 }}>
				<Grid container spacing={0.5}>
					{products.map(
						(product) =>
							parseInt(
								product?.quantity as string,
							) > 0 && (
								<MobileProductCard
									product={product}
									key={product?._id}
								/>
							),
					)}
				</Grid>
			</Container>
		</main>
	);
}
