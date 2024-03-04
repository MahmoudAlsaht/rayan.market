/* eslint-disable no-mixed-spaces-and-tabs */
import { destroyProductImage } from '../../controllers/productImages';
import { destroyBannerImage } from '../../controllers/bannerImages';
import DeleteIcon from '@mui/icons-material/Delete';
import { Badge } from '@mui/material';

type PreviewImageProps = {
	path: string;
	imageId?: string;
	type?: string;
	dataType?: string;
	handleRemove: (id: string) => void;
	productId?: string;
	bannerId?: string;
};

function PreviewImage({
	imageId = '',
	path,
	dataType,
	type = '',
	productId,
	bannerId,
	handleRemove,
}: PreviewImageProps) {
	const handleDelete = async () => {
		if (type !== '') {
			handleRemove(imageId);
		} else {
			dataType === 'product'
				? await destroyProductImage(
						productId as string,
						imageId,
				  )
				: await destroyBannerImage(
						bannerId as string,
						imageId,
				  );
			handleRemove(imageId);
		}
	};

	return (
		<Badge
			badgeContent={
				<DeleteIcon
					onClick={handleDelete}
					color='error'
				/>
			}
		>
			<img
				src={path}
				alt={`product-image${imageId}`}
				width={100}
				height={95}
			/>
		</Badge>
	);
}

export default PreviewImage;
