import { Image } from 'react-bootstrap';
import { BsTrashFill } from 'react-icons/bs';

type PreviewImageProps = {
	path: string;
	filename?: string | number;
	imageId?: string | number;
	className?: string;
	type?: string;
};

function PreviewImage({
	imageId,
	className,
	path,
}: // type,
PreviewImageProps) {
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
				/>
			</span>
		</>
	);
}

export default PreviewImage;
