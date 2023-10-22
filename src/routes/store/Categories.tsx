import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ICategory } from '../../app/store/category';
import { fetchCategories } from '../../controllers/category';

function Categories() {
	const dispatch = useAppDispatch();
	const categories: ICategory[] | null = useAppSelector(
		(state) => state.categories,
	);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<>
			<ul>
				{categories != null &&
					categories.map((category: ICategory) => (
						<li
							key={category.id}
							className='text-danger'
						>
							{category.name}
						</li>
					))}
			</ul>
		</>
	);
}

export default Categories;
