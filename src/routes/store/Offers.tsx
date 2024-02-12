import { useEffect, useState } from 'react';
import { TProduct } from '../../app/store/product';
import { fetchOffers } from '../../controllers/product';
import Banner from '../../components/Banner';
import { Col, Row } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';

function Offers() {
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
		<div className='productContainer'>
			<Banner />
			<Row>
				{products &&
					products?.map((product) => (
						<Col
							key={product?._id}
							xs={12}
							sm={6}
							md={3}
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
}

export default Offers;
