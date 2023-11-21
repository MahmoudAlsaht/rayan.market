import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TCategory } from '../../app/store/category';
import { fetchCategory } from '../../controllers/category';

function Category() {
	const { categoryId } = useParams();
	const [category, setCategory] = useState<TCategory | null>(
		null,
	);

	useEffect(() => {
		const getCategory = async () => {
			if (categoryId) {
				const data = await fetchCategory(categoryId);
				setCategory(data as TCategory);
			}
		};
		getCategory();
	}, [categoryId]);

	return (
		<div className='mt-5 text-danger'>{category?.name}</div>
	);
}

export default Category;
