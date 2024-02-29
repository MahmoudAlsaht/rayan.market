import { ReactNode } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type widgetProps = {
	widgetTitle: string | ReactNode;
	body?: ReactNode;
	height?: string;
	href: string;
};

function Widget({
	widgetTitle,
	href,
	height = '120px',
}: widgetProps) {
	return (
		<>
			<Link to={href}>
				<Card sx={{ height, m: 3 }}>
					<main dir='rtl'>
						<CardContent>
							<Typography variant='h6'>
								{widgetTitle}
							</Typography>
						</CardContent>
						<CardActions>
							<legend
								style={{
									color: '#0055aa',
								}}
							>
								عرض المزيد <ArrowBackIcon />
							</legend>
						</CardActions>
					</main>
				</Card>
			</Link>
		</>
	);
}

export default Widget;
