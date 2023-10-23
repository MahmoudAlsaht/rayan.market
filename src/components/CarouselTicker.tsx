import Ticker from 'framer-motion-ticker';
import { Link } from 'react-router-dom';
import { ICategory } from '../app/store/category';

type CarouselTickerProps = {
	category: ICategory;
	name?: string;
};

function CarouselTicker({ category }: CarouselTickerProps) {
	const colors = [
		'#632bf3',
		'#f122c8',
		'#f16022',
		'#9ef344',
		'#44d3f3',
	];

	return (
		<>
			<h2 className='text-danger text-center'>
				<Link
					to={`/store/categories/${category.id}/products`}
				>
					{category?.name}
				</Link>
			</h2>
			<Ticker duration={20}>
				{colors.map((color, index) => (
					<Link
						to={`/store/categories/${category.id}/products`}
						key={index}
						style={{
							backgroundColor: color,
							margin: '5px',
							height: '250px',
							width: '200px',
						}}
					></Link>
				))}
			</Ticker>
		</>
	);
}

export default CarouselTicker;
