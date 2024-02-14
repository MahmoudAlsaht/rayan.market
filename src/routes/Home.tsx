/* eslint-disable no-mixed-spaces-and-tabs */
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { memo, useEffect } from 'react';
import { fetchProducts } from '../controllers/product';
import ProductCard from '../components/ProductCard';
import { Col, Row } from 'react-bootstrap';
import { TProduct } from '../app/store/product';
import Banner from '../components/Banner';

const Home = memo(() => {
	const dispatch = useAppDispatch();
	const products: (TProduct | null)[] = useAppSelector(
		(state) => state.products,
	);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<div className='productContainer'>
			<Banner />
			<Row className='mt-5'>
				{products
					? products?.map((product) => (
							<Col
								key={product?._id}
								xs={12}
								sm={6}
								md={3}
								xl={2}
							>
								<ProductCard
									product={product as TProduct}
								/>
							</Col>
					  ))
					: null}
			</Row>
		</div>
	);
});

export default Home;
