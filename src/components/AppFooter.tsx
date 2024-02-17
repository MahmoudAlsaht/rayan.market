import {
	BsFacebook,
	BsTwitter,
	BsInstagram,
} from 'react-icons/bs';

function AppFooter() {
	const currentYear = new Date().getFullYear();
	return (
		<footer
			className='text-center'
			style={{
				backgroundColor: 'rgba(0, 0, 0, 0.05)',
			}}
		>
			<div className='container pt-4'>
				<section className='mb-4'>
					<a
						data-mdb-ripple-init
						className='btn btn-link btn-floating btn-lg text-body m-1'
						href='#!'
						role='button'
						data-mdb-ripple-color='dark'
					>
						<BsFacebook />
					</a>

					<a
						data-mdb-ripple-init
						className='btn btn-link btn-floating btn-lg text-body m-1'
						href='#!'
						role='button'
						data-mdb-ripple-color='dark'
					>
						<BsInstagram />
					</a>

					<a
						data-mdb-ripple-init
						className='btn btn-link btn-floating btn-lg text-body m-1'
						href='#!'
						role='button'
						data-mdb-ripple-color='dark'
					>
						<BsTwitter />
					</a>
				</section>
			</div>

			<div className='text-center p-3'>
				© {currentYear} All Rights Reserved
				<a href='#' style={{ fontWeight: 'bold' }}>
					{' '}
					Al Rayyan Markets
				</a>
			</div>
		</footer>
	);
}

export default AppFooter;
