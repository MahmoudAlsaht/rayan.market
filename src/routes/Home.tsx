import Ticker from 'framer-motion-ticker';
import { Link } from 'react-router-dom';

function Home() {
	const colors = [
		'#632bf3',
		'#f122c8',
		'#f16022',
		'#9ef344',
		'#44d3f3',
	];

	return (
		<>
			<h2 className='text-danger text-center'>Ticker 1</h2>
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
			<h2 className='text-danger text-center'>Ticker 2</h2>
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
			<h2 className='text-danger text-center'>Ticker 3</h2>
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
		</>
	);
}

export default Home;
