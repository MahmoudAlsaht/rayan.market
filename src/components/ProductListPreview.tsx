import { Box, Paper, Typography } from '@mui/material';
import ProductsList from './ProductsList';
import { useState } from 'react';

type ProductListPreviewProps = {
	title?: string;
	mt?: number;
	mb?: number;
	sortBasedOn?: string;
	labelId?: string;
	productId?: string;
	productsLength?: number;
};

export default function ProductListPreview({
	title = '',
	mt = 0,
	mb = 0,
	sortBasedOn = '',
	labelId = '',
	productId = '',
	productsLength = 6,
}: ProductListPreviewProps) {
	const [productListLength, setProductListLength] =
		useState(0);

	return (
		<main dir='rtl'>
			<Box sx={{ mt: 5 }}>
				<Paper
					role='most view products'
					sx={{ mt: 15, bgcolor: 'inherit' }}
				>
					<Typography
						variant='h5'
						color='primary'
						sx={{ ml: 5, mt: 5, pt: 2.5 }}
					>
						{productListLength > 0 && title}{' '}
					</Typography>
					<ProductsList
						productsLength={productsLength}
						mt={mt}
						mb={mb}
						sortBasedOn={sortBasedOn}
						productId={productId}
						labelId={labelId}
						setProductListLength={
							setProductListLength
						}
					/>
				</Paper>
			</Box>
		</main>
	);
}
