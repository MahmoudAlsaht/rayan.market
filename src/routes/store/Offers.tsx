import { FormEvent, useEffect, useMemo, useState } from 'react';
import { TProduct } from '../../app/store/product';
import { fetchOffers } from '../../controllers/product';
import Banner from '../../components/Banner';
import FilterProducts from '../../components/FilterProducts';
import { Col, Row } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';
import {
	filteredData,
	sortProductsBasedOnPrice,
} from '../../utils';
import { DocumentData } from 'firebase/firestore';

function Offers() {
	const [products, setProducts] = useState<
		TProduct[] | null
	>();

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
		const getProducts = async () => {
			const fetchedProducts = await fetchOffers();
			setProducts(fetchedProducts);
		};
		getProducts();
	}, []);
	return (
		<div className='productContainer'>
			<Banner />
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
							lg={3}
						>
							<ProductCard product={product} />
						</Col>
					))}
			</Row>
		</div>
	);
}

export default Offers;
