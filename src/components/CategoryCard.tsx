import { TCategory } from '../app/store/category';
import { Box, Typography, Avatar, Link } from '@mui/material/';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

type CategoryCardProps = {
	category: TCategory | null;
};

export default function CategoryCard({
	category,
}: CategoryCardProps) {
	return (
		<Grid xs={6} md={2}>
			<Link
				href={`categories/${category?._id}`}
				sx={{ textDecoration: 'none' }}
			>
				{!category?.image ? (
					<Box
						sx={{
							width: 150,
							height: 150,
							borderRadius: '50%',
							border: '1px solid #07a180',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							cursor: 'pointer',
							transition: 'all 200ms ease-in-out',
							'&:hover': {
								color: '#fff',
								backgroundColor: 'primary.main',
							},
						}}
					/>
				) : (
					<div
						style={{
							height: '150px',
							overflow: 'hidden',
						}}
					>
						<Avatar
							sx={{
								width: 150,
								height: 150,
								borderRadius: '50%',
								cursor: 'pointer',
								transition:
									'transform .5s ease-in-out',
								'&:hover': {
									transform: 'scale(1.2)',
								},
							}}
							src={category.image.path}
						/>
					</div>
				)}
				<Typography
					sx={{
						fontSize: 30,
						color: 'primary.main',
						mx: 3,
					}}
				>
					{category?.name}
				</Typography>
			</Link>
		</Grid>
	);
}
