import {
	Card,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material';
import { TCategory } from '../../app/store/category';

type MobileCategoryCardProps = {
	category: TCategory | null;
};

export default function MobileCategoryCard({
	category,
}: MobileCategoryCardProps) {
	return (
		<Grid xs={3}>
			<Card
				sx={{
					mx: 1,
					mb: 1,
					height: '70px',
					width: '70px',
					background: 'none',
					borderRadius: '50%',
				}}
			>
				<CardMedia
					component='img'
					width={'100%'}
					height={'100%'}
					image={category?.image?.path}
					alt={`${category?.name}'s image`}
				/>
			</Card>
			<Typography
				sx={{
					color: 'primary.main',
					fontSize: 12,
					textAlign: 'center',
				}}
			>
				{category?.name}
			</Typography>
		</Grid>
	);
}
