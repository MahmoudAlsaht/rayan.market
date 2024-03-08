import {
	Card,
	CardMedia,
	Grid,
	Skeleton,
	Typography,
} from '@mui/material';
import { TCategory } from '../../app/store/category';
import { useNavigate } from 'react-router-dom';

type MobileCategoryCardProps = {
	category: TCategory | null;
};

export default function MobileCategoryCard({
	category,
}: MobileCategoryCardProps) {
	const navigate = useNavigate();

	return (
		<Grid xs={3}>
			<legend>
				{category?.image ? (
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
							onClick={() =>
								navigate(
									`/categories/${category?._id}`,
								)
							}
						/>
					</Card>
				) : (
					<Skeleton
						sx={{
							height: '70px',
							width: '70px',
							borderRadius: '50%',
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
					{category?.name}
				</Typography>
			</legend>
		</Grid>
	);
}
