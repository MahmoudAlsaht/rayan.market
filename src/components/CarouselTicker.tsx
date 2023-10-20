import Ticker from 'framer-motion-ticker';
import { Link } from 'react-router-dom';

type CarouselTickerProps = {
	colors: string[];
	name?: string;
};

function CarouselTicker({ name, colors }: CarouselTickerProps) {
	return (
		<div>
			<h2 className='text-danger text-center'>{name}</h2>
			<Ticker duration={20}>
				{colors.map((item, index) => (
					<Link
						to='#'
						key={index}
						style={{
							backgroundColor: item,
							margin: '5px',
							height: '250px',
							width: '200px',
						}}
					></Link>
				))}
			</Ticker>
		</div>
	);
}

export default CarouselTicker;
