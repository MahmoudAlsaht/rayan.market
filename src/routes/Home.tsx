import { DocumentData } from 'firebase/firestore';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../controllers/product';
import ProductCard from '../components/ProductCard';
import { Col, Row } from 'react-bootstrap';
import { filteredData } from '../utils';

function Home() {
	const dispatch = useAppDispatch();
	const products: (DocumentData | undefined)[] =
		useAppSelector((state) => state.products);

	const [queryInput, setQueryInput] = useState('');

	const handleQueryChange = (
		e: FormEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	const filteredProducts = useMemo(() => {
		return filteredData(
			products as DocumentData[],
			queryInput,
		);
	}, [products, queryInput]);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<div className='productContainer'>
			<input
				type='search'
				placeholder='search products'
				value={queryInput}
				onChange={handleQueryChange}
			/>
			<Row>
				{filteredProducts &&
					filteredProducts?.map((product) => (
						<Col
							key={product?.id}
							xs={12}
							sm={6}
							lg={4}
						>
							<ProductCard product={product} />
						</Col>
					))}
			</Row>
		</div>
	);
}

export default Home;
