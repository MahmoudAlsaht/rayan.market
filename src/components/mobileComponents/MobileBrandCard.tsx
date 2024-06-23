import {
	Avatar,
	Card,
	Grid,
	Skeleton,
	Typography,
} from '@mui/material';
import { TBrand } from '../../app/store/brand';
import { useNavigate } from 'react-router-dom';

type MobileBrandCardProps = {
	brand: TBrand | null;
};

export default function MobileBrandCard({
	brand,
}: MobileBrandCardProps) {
	const navigate = useNavigate();
	return (
		<Grid item xs={2.5}>
			{brand?.image ? (
				<Card
					sx={{
						mx: 1,
						mb: 1,
						background: 'none',
						height: '70px',
						width: '65px',
						borderRadius: '20%',
					}}
				>
					<Avatar
						sx={{
							borderRadius: 0,
							width: '100%',
							height: '100%',
						}}
						src={brand?.image?.path}
						onClick={() =>
							navigate(`/brands/${brand?._id}`)
						}
					>
						No Image
					</Avatar>
				</Card>
			) : (
				<Skeleton
					sx={{
						height: '100px',
						width: '65px',
						borderRadius: '20%',
					}}
				/>
			)}
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
