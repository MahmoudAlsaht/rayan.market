import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TCategory } from '../../app/store/category';
import { fetchCategory } from '../../controllers/category';
import { fetchCategoryProducts } from '../../controllers/product';
import { DocumentData } from 'firebase/firestore';
import { Col, Row } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';

function Category() {
	const { categoryId } = useParams();
	const [category, setCategory] = useState<TCategory | null>(
		null,
	);
	const [products, setProducts] =
		useState<(DocumentData | undefined)[]>();

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
		<div className='mt-5'>
			<h1 className='text-center'>{category?.name}</h1>
			<Row>
				{products?.map((product) => (
					<Col key={product?.id} xs={12} sm={6} lg={4}>
						<ProductCard product={product} />
					</Col>
				))}
			</Row>
		</div>
	);
}

export default Category;
