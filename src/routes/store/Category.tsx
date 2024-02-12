import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TCategory } from '../../app/store/category';
import { fetchCategory } from '../../controllers/category';
import { fetchCategoryProducts } from '../../controllers/product';
import { Col, Row } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';
import { TProduct } from '../../app/store/product';
import Banner from '../../components/Banner';

function Category() {
	const { categoryId } = useParams();
	const [category, setCategory] = useState<TCategory | null>(
		null,
	);
	const [products, setProducts] =
		useState<(TProduct | null)[]>();

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

			<Row>
				{products?.map((product) => (
					<Col
						key={product?._id}
						xs={12}
						sm={6}
						md={3}
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
}

export default Category;
