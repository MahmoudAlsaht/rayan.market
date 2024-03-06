import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
	Facebook,
	Twitter,
	Instagram,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';

function Copyright() {
	return (
		<Typography variant='body2' color='text.secondary'>
			{'Copyright © '}
			Alrayan Markets {new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default function StickyFooter() {
	return (
		<Box
			sx={{
				display: { xs: 'none', md: 'flex' },
				flexDirection: 'column',
				minHeight: '100vh',
			}}
		>
			<Box
				component='footer'
				sx={{
					py: 3,
					px: 2,
					mt: 'auto',
					backgroundColor: 'primary.light',
				}}
			>
				<Container maxWidth='sm'>
					<Typography variant='body1'>
						<IconButton>
							<Facebook />
						</IconButton>
						<IconButton>
							<Twitter />
						</IconButton>
						<IconButton>
							<Instagram />
						</IconButton>
					</Typography>
					<Copyright />
				</Container>
			</Box>
		</Box>
	);
}
