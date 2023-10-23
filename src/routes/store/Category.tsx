import { useParams } from 'react-router-dom';

function Category() {
	const { categoryId } = useParams();
	return <div className='m-5 text-danger'>{categoryId}</div>;
}

export default Category;
