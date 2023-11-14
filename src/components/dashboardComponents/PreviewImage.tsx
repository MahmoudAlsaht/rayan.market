import { Image } from 'react-bootstrap';
import { BsTrashFill } from 'react-icons/bs';

type PreviewImageProps = {
	path: string;
	filename?: string | number;
	imageId?: string;
	className?: string;
	type?: string;
	handleRemove?: (id: string) => void;
};

function PreviewImage({
	imageId = '',
	className,
	path,
	handleRemove = (imageId: string) =>
		alert(`remove ${imageId}`),
}: PreviewImageProps) {
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
					onClick={() => handleRemove(imageId)}
				/>
			</span>
		</>
	);
}

export default PreviewImage;
