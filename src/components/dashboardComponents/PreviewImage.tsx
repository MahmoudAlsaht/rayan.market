import { Image } from 'react-bootstrap';

type PreviewImageProps = {
	path: string;
	filename?: string | number;
	imageId?: string | number;
	className?: string;
};

function PreviewImage({
	imageId,
	className,
	path,
}: PreviewImageProps) {
	return (
		<Image
			src={path}
			alt={`product-image${imageId}`}
			width={100}
			height={100}
			className={className}
		/>
	);
}

export default PreviewImage;
