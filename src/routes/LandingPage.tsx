// import { Button, Grid, Typography } from '@mui/material';
// import coverImg from '../coverImg.jpg';
// import EastIcon from '@mui/icons-material/East';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function LandingPage() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/home');
	}, [navigate]);
	return (
		// <Grid container>
		// 	<Grid
		// 		xs={12}
		// 		md={6}
		// 		sx={{
		// 			display: 'flex',
		// 			flexDirection: 'column',
		// 			alignItems: 'center',
		// 			justifyContent: 'center',
		// 			backgroundColor: '#fff',
		// 			color: '#000',
		// 			height: '100dvh',
		// 		}}
		// 	>
		// 		<h1 className=''>Welcome</h1>
		// 		<Typography
		// 			sx={{
		// 				textAlign: 'center',
		// 				width: '60%',
		// 				mb: 2,
		// 			}}
		// 		>
		// 			Lorem ipsum dolor sit amet consectetur
		// 			adipisicing elit. Perspiciatis qui nulla
		// 			labore reiciendis itaque fuga, aperiam
		// 			consectetur quo vitae corporis, voluptatibus,
		// 			quia quod laudantium praesentium nihil est
		// 			accusamus cupiditate hic?
		// 		</Typography>
		// 		<Button
		// 			onClick={() => navigate('/home')}
		// 			sx={{
		// 				color: '#000',
		// 				border: '1px solid #000',
		// 				padding: '.5rem .8rem',
		// 				borderRadius: '.5rem',
		// 				display: 'flex',
		// 				transition: 'all 200ms ease-in-out',
		// 				textDecoration: 'none',
		// 				'&:hover': {
		// 					backgroundColor: '#000',
		// 					color: '#fff',
		// 				},
		// 			}}
		// 		>
		// 			Take a look <EastIcon />
		// 		</Button>
		// 	</Grid>
		// 	<Grid
		// 		xs={12}
		// 		md={6}
		// 		sx={{
		// 			display: 'flex',
		// 			flexDirection: 'column',
		// 			alignItems: 'center',
		// 			justifyContent: 'center',
		// 			height: '100dvh',
		// 			backgroundColor: '#000',
		// 		}}
		// 	>
		// 		<img
		// 			width={300}
		// 			src={coverImg}
		// 			alt='alrayan logo'
		// 		/>
		// 	</Grid>
		// </Grid>
		null
	);
}
