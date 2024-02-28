import { memo, useEffect, useState } from 'react';
import { TProduct } from '../../app/store/product';
import { fetchOffers } from '../../controllers/product';
import ProductCard from '../../components/ProductCard';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

const Offers = memo(() => {
	const [products, setProducts] =
		useState<(TProduct | null)[]>();

	useEffect(() => {
		const getProducts = async () => {
			const fetchedProducts = await fetchOffers();
			setProducts(fetchedProducts);
		};
		getProducts();
	}, []);
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

export default Offers;
