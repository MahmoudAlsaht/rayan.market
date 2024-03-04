import { AppBar, Button, Container } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import { useNavigate } from 'react-router-dom';

function AuthNavbar() {
	const navigate = useNavigate();
	return (
		<main dir='rtl'>
			<AppBar position='static' sx={{ height: '50px' }}>
				<Container>
					<Button
						onClick={() => navigate(-1)}
						color='secondary'
						aria-label='menu'
						sx={{ mr: 2 }}
					>
						<EastIcon />
					</Button>
				</Container>
			</AppBar>
		</main>
	);
}

export default AuthNavbar;
