/* eslint-disable no-mixed-spaces-and-tabs */
// import { useAppSelector, useAppDispatch } from '../app/hooks';
import { memo } from 'react';
// import { fetchProducts } from '../controllers/product';
// import ProductCard from '../components/ProductCard';
// import { TProduct } from '../app/store/product';
import Banner from '../components/Banner';
import CategoryList from '../components/CategoryList';

const Home = memo(() => {
	// const dispatch = useAppDispatch();
	// const products: (TProduct | null)[] = useAppSelector(
	// 	(state) => state.products,
	// );

	// useEffect(() => {
	// 	dispatch(fetchProducts());
	// }, [dispatch]);

	return (
		<div>
			<Banner />
			<CategoryList />
		</div>
	);
});

export default Home;
