/* eslint-disable no-mixed-spaces-and-tabs */
import { destroyBannerImage } from '../../controllers/bannerImages';
import DeleteIcon from '@mui/icons-material/Delete';
import { Badge } from '@mui/material';

type PreviewImageProps = {
	path: string;
	imageId?: string;
	type?: string;
	dataType?: string;
	handleRemove: (id: string) => void;
	bannerId?: string;
};

function PreviewImage({
	imageId = '',
	path,
	dataType,
	type = '',
	bannerId,
	handleRemove,
}: PreviewImageProps) {
	const handleDelete = async () => {
		if (type !== '') {
			handleRemove(imageId);
		} else {
			dataType !== 'product' &&
				(await destroyBannerImage(
					bannerId as string,
					imageId,
				));
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
				style={{
					marginRight: '2.5rem',
					marginBottom: '.5rem',
					borderRadius: '10px',
				}}
			/>
		</Badge>
	);
}

export default PreviewImage;
