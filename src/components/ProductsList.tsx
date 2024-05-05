/* eslint-disable no-mixed-spaces-and-tabs */
import { memo, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { TProduct } from '../app/store/product';
import { Box, Grid } from '@mui/material';
import MobileProductCard from '../components/mobileComponents/MobileProductCard';
import { sortProducts } from '../controllers/product';

const ProductsList = memo(
	({
		productsLength = 0,
		mt = 20,
		mb = 0,
		sortBasedOn = 'views',
		labelId = '',
		productId = '',
		setProductListLength,
	}: {
		productsLength?: number;
		mt?: number;
		mb?: number;
		sortBasedOn?: string;
		labelId?: string;
		productId?: string;
		setProductListLength: (num: number) => void;
	}) => {
		const [sortedProducts, setSortedProducts] = useState<
			(TProduct | null)[]
		>([]);

		useEffect(() => {
			const getProducts = async () => {
				const fetchedProducts = await sortProducts(
					productsLength,
					sortBasedOn,
					labelId,
					productId,
				);
				setSortedProducts(fetchedProducts);
			};
			getProducts();
			setProductListLength(sortedProducts?.length);
		}, [
			labelId,
			productId,
			productsLength,
			setProductListLength,
			sortBasedOn,
			sortedProducts?.length,
		]);

		return (
			<Box sx={{ mt: { sm: mt }, mb }}>
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
										item
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
											item
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
						{sortedProducts?.map(
							(product, index) => {
								return productsLength === 0 &&
									parseInt(
										product?.quantity as string,
									) > 0 ? (
									<MobileProductCard
										key={product?._id}
										product={
											product as TProduct
										}
									/>
								) : (
									index < productsLength &&
										parseInt(
											product?.quantity as string,
										) > 0 && (
											<MobileProductCard
												key={
													product?._id
												}
												product={
													product as TProduct
												}
											/>
										)
								);
							},
						)}
					</Grid>
				</main>
			</Box>
		);
	},
);

export default ProductsList;
