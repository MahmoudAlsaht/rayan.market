import { Grid, Link } from '@mui/material';
import coverImg from '../coverImg.jpg';
import EastIcon from '@mui/icons-material/East';

export default function LandingPage() {
	return (
		<Grid container>
			<Grid
				xs={12}
				md={6}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#fff',
					color: '#000',
					height: '100dvh',
				}}
			>
				<h1 className=''>Welcome</h1>
				<p className='text-center w-50'>
					Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Perspiciatis qui nulla
					labore reiciendis itaque fuga, aperiam
					consectetur quo vitae corporis, voluptatibus,
					quia quod laudantium praesentium nihil est
					accusamus cupiditate hic?
				</p>
				<Link
					href='/home'
					sx={{
						color: '#000',
						border: '1px solid #000',
						padding: '.5rem .8rem',
						borderRadius: '.5rem',
						transition: 'all 200ms ease-in-out',
						textDecoration: 'none',
						'&:hover': {
							backgroundColor: '#000',
							color: '#fff',
						},
					}}
				>
					Take a look <EastIcon />
				</Link>
			</Grid>
			<Grid
				xs={12}
				md={6}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100dvh',
					backgroundColor: '#000',
				}}
			>
				<img
					width={300}
					src={coverImg}
					alt='alrayan logo'
				/>
			</Grid>
		</Grid>
	);
}
