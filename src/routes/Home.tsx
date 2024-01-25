import { DocumentData } from 'firebase/firestore';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../controllers/product';
import ProductCard from '../components/ProductCard';
import { Col, Row } from 'react-bootstrap';
import {
	filteredData,
	sortProductsBasedOnPrice,
} from '../utils';
import { TProduct } from '../app/store/product';
import FilterProducts from '../components/FilterProducts';

function Home() {
	const dispatch = useAppDispatch();
	const products: TProduct[] | null = useAppSelector(
		(state) => state.products,
	);

	const [queryInput, setQueryInput] = useState('');

	const [filterOption, setFilterOption] = useState('all');

	const handleQueryChange = (
		e: FormEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	const handleFilterOptionChange = (option: string) => {
		setFilterOption(option);
	};

	const filteredProducts = useMemo(() => {
		return sortProductsBasedOnPrice(
			filteredData(
				products as DocumentData[],
				queryInput,
			) as TProduct[],
			filterOption,
		);
	}, [filterOption, products, queryInput]);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<div className='productContainer'>
			<FilterProducts
				queryInput={queryInput}
				handleQueryChange={handleQueryChange}
				handleFilterOptionChange={
					handleFilterOptionChange
				}
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
