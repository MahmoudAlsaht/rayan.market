import CarouselTicker from '../components/CarouselTicker';

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
			<CarouselTicker colors={colors} name='Ticker' />
		</>
	);
}

export default Home;
