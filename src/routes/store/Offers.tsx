import { memo, useEffect, useState } from 'react';
import { TProduct } from '../../app/store/product';
import { fetchOffers } from '../../controllers/product';
import { Col, Row } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';

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
			<Row>
				{products &&
					products?.map((product) => (
						<Col
							key={product?._id}
							xs={4}
							sm={3}
							lg={2}
						>
							<ProductCard
								product={product as TProduct}
							/>
						</Col>
					))}
			</Row>
		</div>
	);
});

export default Offers;
