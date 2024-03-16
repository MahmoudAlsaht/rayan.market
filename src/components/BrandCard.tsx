import { TBrand } from '../app/store/brand';
import { Box, Typography, Avatar } from '@mui/material/';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useNavigate } from 'react-router-dom';

type BrandCardProps = {
	brand: TBrand | null;
};

export default function BrandCard({ brand }: BrandCardProps) {
	const navigate = useNavigate();

	return (
		<Grid lg={2}>
			{!brand?.image ? (
				<Box
					onClick={() =>
						navigate(`/brands/${brand?._id}`)
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
					onClick={() =>
						navigate(`/brands/${brand?._id}`)
					}
					sx={{
						height: '150px',
						overflow: 'hidden',
					}}
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
						src={brand.image.path}
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
				{brand?.name}
			</Typography>
		</Grid>
	);
}
