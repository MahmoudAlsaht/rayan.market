import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MainMobileNavBar() {
	const navigate = useNavigate();

	return (
		<AppBar
			sx={{
				position: 'relative',
				bgcolor: '#fff',
				mb: 2,
			}}
		>
			<Toolbar>
				<IconButton
					edge='start'
					sx={{ color: 'black' }}
					aria-label='close'
					onClick={() => navigate(-1)}
				>
					<KeyboardArrowRightIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}
