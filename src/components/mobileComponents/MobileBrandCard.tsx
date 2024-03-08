import {
	Card,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material';
import { TBrand } from '../../app/store/brand';

type MobileBrandCardProps = {
	brand: TBrand | null;
};

export default function MobileBrandCard({
	brand,
}: MobileBrandCardProps) {
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
					image={brand?.image?.path}
					alt={`${brand?.name}'s image`}
				/>
			</Card>
			<Typography
				sx={{
					color: 'primary.main',
					fontSize: 12,
					textAlign: 'center',
				}}
			>
				{brand?.name}
			</Typography>
		</Grid>
	);
}
