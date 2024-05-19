import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { TProduct } from '../../app/store/product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../controllers/product';
import { Box, Button, Grid } from '@mui/material';
import MobileProductCard from '../../components/mobileComponents/MobileProductCard';
import MainMobileNavBar from './MainMobileNavBar';
import { TBrand } from '../../app/store/brand';
import { fetchBrand } from '../../controllers/brand';
import Banner from '../../components/Banner';
import { TBanner } from '../../app/store/banner';
import { fetchUser } from '../../controllers/user';
import { TUser } from '../../app/auth/auth';
import EditBrandForm from '../../components/forms/EditBrandForm';

const Brand = memo(() => {
	const { brandId } = useParams();
	const dispatch = useAppDispatch();
	const allProducts: (TProduct | null)[] = useAppSelector(
		(state) => state.products,
	);
	const [brand, setBrand] = useState<TBrand | null>(null);

	const [isLoading, setIsLoading] = useState(false);

	const [show, setShow] = useState(false);

	const handleSetShow = () => setShow(!show);

	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);

	useEffect(() => {
		dispatch(fetchUser());
		setIsLoading(true);
		const getBrand = async () => {
			const fetchedCategory = await fetchBrand(
				brandId as string,
			);
			setBrand(fetchedCategory);
		};
		getBrand();
		dispatch(fetchProducts());
		setIsLoading(false);
	}, [brandId, dispatch]);

	return (
		<Box sx={{ mt: { sm: 17 } }}>
			{!isLoading ? (
				<div dir='rtl'>
					<Banner
						banner={brand?.banner as TBanner | null}
					/>

					<Box
						sx={{
							display: { xs: 'none', sm: 'block' },
						}}
					>
						{(user?.role === 'admin' ||
							user?.role === 'editor') && (
							<legend
								style={{ marginTop: '2rem' }}
							>
								<Button
									onClick={handleSetShow}
									color='warning'
									variant='contained'
								>
									تعديل العلامة التجارية
								</Button>
								<EditBrandForm
									handleClose={handleSetShow}
									show={show}
									brand={brand}
								/>
							</legend>
						)}
					</Box>
					<Grid
						container
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

					<Box
						sx={{
							display: {
								sm: 'none',
							},
						}}
					>
						<MainMobileNavBar />

						{(user?.role === 'admin' ||
							user?.role === 'editor') && (
							<legend>
								<Button
									onClick={handleSetShow}
									color='warning'
									variant='contained'
									sx={{ mb: 3 }}
								>
									تعديل العلامة التجارية
								</Button>
								<EditBrandForm
									handleClose={handleSetShow}
									show={show}
									brand={brand}
								/>
							</legend>
						)}

						<Grid container sx={{ mb: 10 }}>
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
					</Box>
				</div>
			) : null}
		</Box>
	);
});

export default Brand;
