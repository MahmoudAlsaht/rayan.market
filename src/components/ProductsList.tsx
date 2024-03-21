/* eslint-disable no-mixed-spaces-and-tabs */
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { memo, useEffect, useState } from 'react';
import { fetchProducts } from '../controllers/product';
import ProductCard from '../components/ProductCard';
import { TProduct } from '../app/store/product';
import { Box, Grid } from '@mui/material';
import MobileProductCard from '../components/mobileComponents/MobileProductCard';

const ProductsList = memo(
	({
		productsLength = 0,
		mt = 20,
	}: {
		productsLength?: number;
		mt?: number;
	}) => {
		const dispatch = useAppDispatch();
		const products: (TProduct | null)[] = useAppSelector(
			(state) => state.products,
		);

		const [sortedProducts, setSortedProducts] = useState<
			(TProduct | null)[]
		>([]);

		useEffect(() => {
			dispatch(fetchProducts());
			setSortedProducts(
				productsLength === 0
					? products
					: products.toSorted((a, b) =>
							b != null && a != null
								? b.views - a.views
								: 0 - 0,
					  ),
			);
		}, [dispatch, products, productsLength]);

		return (
			<Box sx={{ mt: { sm: mt } }}>
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
						{sortedProducts?.map(
							(product, index) => {
								return productsLength === 0 ? (
									<Grid
										sm={3}
										md={2}
										key={product?._id}
									>
										<ProductCard
											product={
												product as TProduct
											}
										/>
									</Grid>
								) : (
									index < productsLength && (
										<Grid
											sm={3}
											md={2}
											key={product?._id}
										>
											<ProductCard
												product={
													product as TProduct
												}
											/>
										</Grid>
									)
								);
							},
						)}
					</Grid>

					<Grid
						container
						sx={{
							mt: 2,
							mb: 5,
							display: {
								sm: 'none',
							},
						}}
						spacing={1}
					>
						{sortedProducts.map((product, index) => {
							return productsLength === 0 &&
								parseInt(
									product?.quantity as string,
								) > 0 ? (
								<MobileProductCard
									product={product as TProduct}
								/>
							) : (
								index < productsLength &&
									parseInt(
										product?.quantity as string,
									) > 0 && (
										<MobileProductCard
											product={
												product as TProduct
											}
										/>
									)
							);
						})}
					</Grid>
				</main>
			</Box>
		);
	},
);

export default ProductsList;
