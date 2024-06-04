/* eslint-disable no-mixed-spaces-and-tabs */
import { memo, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { TProduct } from '../app/store/product';
import {
	Box,
	Card,
	CardHeader,
	Grid,
	Typography,
} from '@mui/material';
import MobileProductCard from '../components/mobileComponents/MobileProductCard';
import { sortProducts } from '../controllers/product';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';

const ProductsList = memo(
	({
		productsLength = 0,
		mt = 20,
		mb = 0,
		sortBasedOn = '',
		labelId = '',
		productId = '',
		setProductListLength = null,
	}: {
		productsLength?: number;
		mt?: number;
		mb?: number;
		sortBasedOn?: string;
		labelId?: string;
		productId?: string;
		setProductListLength?: ((num: number) => void) | null;
	}) => {
		const [sortedProducts, setSortedProducts] = useState<
			(TProduct | null)[]
		>([]);

		useEffect(() => {
			const getProducts = async () => {
				const fetchedProducts = await sortProducts(
					sortBasedOn,
					labelId,
					productId,
				);
				setSortedProducts(fetchedProducts);
			};
			getProducts();
			if (setProductListLength != null)
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
							mb: 10,
							display: {
								sm: 'none',
							},
						}}
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
						{(sortBasedOn === 'views' ||
							sortBasedOn === 'purchases') &&
							productsLength > 0 && (
								<Grid xs={6}>
									<Link
										to={`/products/top-${sortBasedOn}`}
									>
										<Card
											sx={{
												mx: 1,
												mb: 1,
												height: '215px',
												background:
													'none',
											}}
										>
											<CardHeader
												title={
													<Typography
														sx={{
															color: 'primary.main',
															display:
																'flex',
															alignItems:
																'center',
															justifyContent:
																'center',
															mt: '50%',
														}}
													>
														عرض
														المزيد
														<ChevronLeftIcon />
													</Typography>
												}
											/>
										</Card>
									</Link>
								</Grid>
							)}
					</Grid>
				</main>
			</Box>
		);
	},
);

export default ProductsList;
