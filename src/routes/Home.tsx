import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ICategory } from '../app/store/category';
import CarouselTicker from '../components/CarouselTicker';
import { fetchCategories } from '../controllers/category';

function Home() {
	const dispatch = useAppDispatch();
	const categories: ICategory[] | null = useAppSelector(
		(state) => state.categories,
	);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<>
			{categories != null &&
				categories!.map((category) => (
					<CarouselTicker
						key={category?.id}
						category={category}
					/>
				))}
		</>
	);
}

export default Home;
