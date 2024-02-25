import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TCategory } from '../../app/store/category';
import { fetchCategory } from '../../controllers/category';
import { Col, Row } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';
import { TProduct } from '../../app/store/product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../controllers/product';

const Category = memo(() => {
	const { categoryId } = useParams();
	const dispatch = useAppDispatch();
	const [category, setCategory] = useState<TCategory | null>(
		null,
	);
	const allProducts: (TProduct | null)[] = useAppSelector(
		(state) => state.products,
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
		dispatch(fetchProducts());
		setIsLoading(false);
	}, [categoryId, dispatch]);

	return (
		<>
			{!isLoading ? (
				<div>
					<h1 className='text-center mt-3'>
						{category?.name}
					</h1>

					<Row>
						{allProducts?.map(
							(product) =>
								product?.category?._id ===
									categoryId && (
									<Col
										key={product?._id}
										xs={4}
										sm={3}
										lg={2}
									>
										<ProductCard
											product={
												product as TProduct
											}
										/>
									</Col>
								),
						)}
					</Row>
				</div>
			) : null}
		</>
	);
});

export default Category;
