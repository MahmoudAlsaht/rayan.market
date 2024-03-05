import { Box, Avatar, Link } from '@mui/material/';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { TBrand } from '../app/store/brand';

type BrandCardProps = {
	brand: TBrand | null;
};

export default function BrandCard({ brand }: BrandCardProps) {
	return (
		<Grid lg={2}>
			<Link
				href={`categories/${brand?._id}`}
				sx={{ textDecoration: 'none' }}
			>
				{!brand?.image ? (
					<Box
						sx={{
							width: 100,
							height: 100,
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
								width: {
									sm: 100,
									md: 110,
									lg: 150,
								},
								height: {
									sm: 100,
									md: 110,
									lg: 150,
								},
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
					</div>
				)}
				{/* <Typography
					sx={{
						fontSize: 30,
						color: 'primary.main',
						mx: 3,
					}}
				>
					{brand?.name}
				</Typography> */}
			</Link>
		</Grid>
	);
}
