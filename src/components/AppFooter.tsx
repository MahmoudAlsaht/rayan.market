import {
	createTheme,
	ThemeProvider,
} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
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
			<Link color='inherit' href='#'>
				Alrayan Markets
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function StickyFooter() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<Box
				sx={{
					display: 'flex',
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
						backgroundColor: (theme) =>
							theme.palette.mode === 'light'
								? theme.palette.grey[200]
								: theme.palette.grey[800],
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
		</ThemeProvider>
	);
}
