/* eslint-disable no-mixed-spaces-and-tabs */
import { Image } from 'react-bootstrap';
import { BsTrashFill } from 'react-icons/bs';
import { destroyProductImage } from '../../controllers/productImages';
import { destroyBannerImage } from '../../controllers/bannerImages';

type PreviewImageProps = {
	path: string;
	imageId?: string;
	className?: string;
	type?: string;
	dataType?: string;
	handleRemove: (id: string) => void;
	productId?: string;
	bannerId?: string;
};

function PreviewImage({
	imageId = '',
	className,
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
		<>
			<Image
				src={path}
				alt={`product-image${imageId}`}
				width={100}
				height={95}
				className={`overlay ${className} rounded m-2`}
			/>
			<span className='delete-button bg-white'>
				<BsTrashFill
					style={{
						fontSize: '23px',
					}}
					className='trash-icon text-danger'
					onClick={handleDelete}
				/>
			</span>
		</>
	);
}

export default PreviewImage;
