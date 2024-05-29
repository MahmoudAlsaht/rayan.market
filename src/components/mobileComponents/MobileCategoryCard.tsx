import {
	Avatar,
	Card,
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
		<Grid item xs={2.5}>
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
						<Avatar
							sx={{
								borderRadius: 0,
								width: '100%',
								height: '100%',
							}}
							src={category?.image?.path}
							onClick={() =>
								navigate(
									`/categories/${category?._id}`,
								)
							}
						>
							No Image
						</Avatar>
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
