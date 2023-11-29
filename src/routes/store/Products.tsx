import { DocumentData } from 'firebase/firestore';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../../controllers/product';
import ProductCard from '../../components/ProductCard';
import { Col, Row } from 'react-bootstrap';

function Products() {
	const dispatch = useAppDispatch();
	const products: (DocumentData | undefined)[] =
		useAppSelector((state) => state.products);

	const [queryInput, setQueryInput] = useState('');

	const handleQueryChange = (
		e: FormEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	function escapeRegExp(str: string) {
		return str.replace(/[.@&*+?^${}()|[\]\\]/g, ''); // $& means the whole matched string
	}

	const filteredProducts = useMemo(() => {
		return products?.filter((product) => {
			return product?.name
				.toLowerCase()
				.includes(
					escapeRegExp(
						queryInput?.toLocaleLowerCase(),
					),
				);
		});
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

export default Products;
