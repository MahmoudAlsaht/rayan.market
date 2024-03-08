import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { TProduct } from '../../app/store/product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../controllers/product';
import { Grid } from '@mui/material';
import MobileProductCard from '../../components/mobileComponents/MobileProductCard';

const ShowBrand = memo(() => {
	const { brandId } = useParams();
	const dispatch = useAppDispatch();
	const allProducts: (TProduct | null)[] = useAppSelector(
		(state) => state.products,
	);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		dispatch(fetchProducts());
		setIsLoading(false);
	}, [brandId, dispatch]);

	return (
		<>
			{!isLoading ? (
				<div dir='rtl'>
					<Grid
						container
						spacing={2}
						sx={{
							display: {
								xs: 'none',
								sm: 'flex',
							},
						}}
					>
						{allProducts?.map(
							(product) =>
								product?.brand?._id ===
									brandId && (
									<Grid
										key={product?._id}
										xs={4}
									>
										<ProductCard
											product={
												product as TProduct
											}
										/>
									</Grid>
								),
						)}
					</Grid>
					<Grid
						container
						sx={{
							display: {
								sm: 'none',
							},
						}}
					>
						{allProducts?.map(
							(product) =>
								product?.brand?._id ===
									brandId && (
									<MobileProductCard
										product={
											product as TProduct
										}
									/>
								),
						)}
					</Grid>
				</div>
			) : null}
		</>
	);
});

export default ShowBrand;
