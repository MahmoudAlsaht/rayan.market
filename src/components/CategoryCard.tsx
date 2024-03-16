import { TCategory } from '../app/store/category';
import { Box, Typography, Avatar } from '@mui/material/';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useNavigate } from 'react-router-dom';

type CategoryCardProps = {
	category: TCategory | null;
};

export default function CategoryCard({
	category,
}: CategoryCardProps) {
	const navigate = useNavigate();
	return (
		<Grid lg={2}>
			{!category?.image ? (
				<Box
					onClick={() =>
						navigate(`/categories/${category?._id}`)
					}
					sx={{
						width: { sm: 80, md: 100 },
						height: { sm: 80, md: 100 },
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
				<Box
					sx={{
						height: '150px',
						overflow: 'hidden',
					}}
					onClick={() =>
						navigate(`/categories/${category?._id}`)
					}
				>
					<Avatar
						sx={{
							width: {
								sm: 70,
								md: 110,
								lg: 150,
							},
							height: {
								sm: 70,
								md: 110,
								lg: 150,
							},
							mr: 2,
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
				</Box>
			)}
			<Typography
				sx={{
					fontSize: { sm: 18, md: 27 },
					color: 'primary.main',
					mx: 2,
				}}
			>
				{category?.name}
			</Typography>
		</Grid>
	);
}
