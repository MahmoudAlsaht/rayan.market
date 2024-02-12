import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TCategory } from '../../app/store/category';
import { fetchCategory } from '../../controllers/category';
import { fetchCategoryProducts } from '../../controllers/product';
import { Col, Row } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';
import {
	filteredData,
	sortProductsBasedOnPrice,
} from '../../utils';
import { TProduct } from '../../app/store/product';
import FilterProducts from '../../components/FilterProducts';
import Banner from '../../components/Banner';

function Category() {
	const { categoryId } = useParams();
	const [category, setCategory] = useState<TCategory | null>(
		null,
	);
	const [filterOption, setFilterOption] = useState('all');

	const [products, setProducts] =
		useState<(TProduct | null)[]>();
	const [queryInput, setQueryInput] = useState('');

	const handleQueryChange = (
		e: FormEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	const filteredProducts = useMemo(() => {
		return sortProductsBasedOnPrice(
			filteredData(
				products as any,
				queryInput,
			) as TProduct[],
			filterOption,
		);
	}, [filterOption, products, queryInput]);

	const handleFilterOptionChange = (option: string) => {
		setFilterOption(option);
	};

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
		<div className='productContainer'>
			<Banner />
			<h1 className='text-center mt-3'>
				{category?.name}
			</h1>

			<FilterProducts
				queryInput={queryInput}
				handleQueryChange={handleQueryChange}
				handleFilterOptionChange={
					handleFilterOptionChange
				}
			/>

			<Row>
				{filteredProducts?.map((product) => (
					<Col
						key={product?._id}
						xs={12}
						sm={6}
						md={3}
						lg={2}
					>
						<ProductCard product={product} />
					</Col>
				))}
			</Row>
		</div>
	);
}

export default Category;
