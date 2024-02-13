import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TCategory } from '../../app/store/category';
import { fetchCategory } from '../../controllers/category';
import { Col, Row } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';
import { TProduct } from '../../app/store/product';
import Banner from '../../components/Banner';

const Category = memo(() => {
	const { categoryId } = useParams();
	const [category, setCategory] = useState<TCategory | null>(
		null,
	);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const getCategory = async () => {
			if (categoryId) {
				const data = await fetchCategory(categoryId);
				setCategory(data as TCategory);
			}
		};
		getCategory();
		setIsLoading(false);
	}, [category?.products, categoryId]);

	return (
		<>
			{!isLoading ? (
				<div className='productContainer'>
					<Banner />
					<h1 className='text-center mt-3'>
						{category?.name}
					</h1>

					<Row>
						{category?.products?.map((product) => (
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
			) : null}
		</>
	);
});

export default Category;
