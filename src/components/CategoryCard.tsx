import { TCategory } from '../app/store/category';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

type CategoryCardProps = {
	category: TCategory | null;
};

export default function CategoryCard({
	category,
}: CategoryCardProps) {
	return (
		<Grid xs={6} md={2}>
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
							backgroundColor: '#07a180',
						},
					}}
				/>
			) : (
				<img
					width={150}
					height={150}
					style={{ borderRadius: '50%' }}
					src={category.image.path}
				/>
			)}
			<Typography
				sx={{
					fontSize: 30,
					color: '#07a180',
					mx: 3,
					// textAlign: 'center',
					// width: '50%',
				}}
			>
				{category?.name}
			</Typography>
		</Grid>
	);
}
