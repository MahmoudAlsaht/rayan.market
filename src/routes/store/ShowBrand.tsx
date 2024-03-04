import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBrand } from '../../controllers/brand';
import ProductCard from '../../components/ProductCard';
import { TProduct } from '../../app/store/product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../controllers/product';
import { TBrand } from '../../app/store/brand';
import { Grid } from '@mui/material';

const ShowBrand = memo(() => {
	const { brandId } = useParams();
	const dispatch = useAppDispatch();
	const [brand, setBrand] = useState<TBrand | null>(null);
	const allProducts: (TProduct | null)[] = useAppSelector(
		(state) => state.products,
	);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const getBrand = async () => {
			if (brandId) {
				const data = await fetchBrand(brandId);
				setBrand(data as TBrand);
			}
		};
		getBrand();
		dispatch(fetchProducts());
		setIsLoading(false);
	}, [brandId, dispatch]);

	return (
		<>
			{!isLoading ? (
				<div>
					<h1 className='text-center mt-3'>
						{brand?.name}
					</h1>

					<Grid container spacing={2}>
						{allProducts?.map(
							(product) =>
								product?.brand?._id ===
									brandId && (
									<Grid
										key={product?._id}
										xs={4}
										sm={3}
										lg={2}
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
				</div>
			) : null}
		</>
	);
});

export default ShowBrand;
