/* eslint-disable no-mixed-spaces-and-tabs */
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { memo, useEffect } from 'react';
import { fetchProducts } from '../controllers/product';
import ProductCard from '../components/ProductCard';
import { Col, Row } from 'react-bootstrap';
import { TProduct } from '../app/store/product';

const Home = memo(() => {
	const dispatch = useAppDispatch();
	const products: (TProduct | null)[] = useAppSelector(
		(state) => state.products,
	);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<div>
			<Row className='mt-5'>
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

export default Home;
