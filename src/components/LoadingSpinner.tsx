import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
	return (
		<Spinner
			animation='border'
			variant='success'
			role='status'
		>
			<span className='visually-hidden'>Loading...</span>
		</Spinner>
	);
}

export default LoadingSpinner;
