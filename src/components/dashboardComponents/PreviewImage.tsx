import { Image } from 'react-bootstrap';
import { BsTrashFill } from 'react-icons/bs';
import { deleteProductImages } from '../../controllers/productImages';

type PreviewImageProps = {
	path: string;
	filename?: string;
	imageId?: string;
	className?: string;
	type?: string;
	product?: any;
	handleRemove?: (id: string) => void;
};

function PreviewImage({
	imageId = '',
	filename = '',
	className,
	path,
	product,
	type = '',
	handleRemove = () => {},
}: PreviewImageProps) {
	const handleDelete = async () => {
		if (type !== '') {
			handleRemove(imageId);
		} else {
			await deleteProductImages(
				product,
				filename,
				imageId,
			);
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
