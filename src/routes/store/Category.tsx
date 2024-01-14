import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TCategory } from '../../app/store/category';
import { fetchCategory } from '../../controllers/category';
import { fetchCategoryProducts } from '../../controllers/product';
import { DocumentData } from 'firebase/firestore';
import { Col, Row } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';
import { filteredData } from '../../utils';

function Category() {
	const { categoryId } = useParams();
	const [category, setCategory] = useState<TCategory | null>(
		null,
	);
	const [products, setProducts] =
		useState<(DocumentData | undefined)[]>();
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
		const getCategory = async () => {
			if (categoryId) {
				const data = await fetchCategory(categoryId);
				setCategory(data as TCategory);
			}
		};
		getCategory();
		const getCategoryProducts = async () => {
			if (categoryId) {
				const data = await fetchCategoryProducts(
					categoryId,
				);
				setProducts(data);
			}
		};

		getCategoryProducts();
	}, [categoryId]);

	return (
		<div className='productContainer mt-5'>
			<h1 className='text-center mb-3'>
				{category?.name}
			</h1>
			<input
				type='search'
				placeholder='search products'
				value={queryInput}
				onChange={handleQueryChange}
			/>
			<Row>
				{filteredProducts?.map((product) => (
					<Col key={product?.id} xs={12} sm={6} lg={4}>
						<ProductCard product={product} />
					</Col>
				))}
			</Row>
		</div>
	);
}

export default Category;
