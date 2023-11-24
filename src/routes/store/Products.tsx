import { DocumentData } from 'firebase/firestore';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useEffect } from 'react';
import { fetchProducts } from '../../controllers/product';
import ProductCard from '../../components/ProductCard';
import { Col, Row } from 'react-bootstrap';

function Products() {
	const dispatch = useAppDispatch();
	const products: (DocumentData | undefined)[] =
		useAppSelector((state) => state.products);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<Row>
			{products &&
				products?.map((product) => (
					<Col key={product?.id} xs={12} sm={6} lg={4}>
						<ProductCard product={product} />
					</Col>
				))}
		</Row>
	);
}

export default Products;
