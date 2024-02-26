import { memo } from 'react';
import Banner from '../components/Banner';
import CategoryList from '../components/CategoryList';

const Home = memo(() => {
	return (
		<div>
			<Banner />
			<CategoryList listLength={5} />
		</div>
	);
});

export default Home;
