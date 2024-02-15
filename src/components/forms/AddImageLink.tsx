import { useRef } from 'react';
import { updateImageLink } from '../../controllers/banner';
import { TBannerImage } from '../../app/store/banner';
import { Button, Col, Form, Row } from 'react-bootstrap';
import PreviewImage from '../dashboardComponents/PreviewImage';
import { useAppDispatch } from '../../app/hooks';

type AddImageLinkProps = {
	image: TBannerImage | null;
	bannerId: string;
	setIsLoading: (status: boolean) => void;
	isLoading: boolean;
	handleRemoveBannerImages: (id: string) => void;
};
function AddImageLink({
	image,
	bannerId,
	setIsLoading,
	handleRemoveBannerImages,
	isLoading,
}: AddImageLinkProps) {
	const imageLink = useRef<HTMLInputElement | null>(null);
	const dispatch = useAppDispatch();

	const handleAddALink = async (imageId: string) => {
		try {
			setIsLoading(true);
			dispatch(
				updateImageLink({
					bannerId,
					imageId,
					link: imageLink.current?.value as string,
				}),
			);

			setIsLoading(false);
		} catch (e: any) {
			setIsLoading(false);
			console.error(e);
			throw new Error(e.message);
		}
	};

	return (
		<div>
			<Row key={image?._id}>
				<Col xs={5} md={4}>
					<PreviewImage
						imageId={image?._id}
						path={image?.path as string}
						bannerId={bannerId}
						dataType='banner'
						handleRemove={handleRemoveBannerImages}
					/>
				</Col>
				<Col xs={5} md={6}>
					<Form.Group
						className='mt-3 mb-3'
						controlId={`image${image?._id}'sLinkInput`}
					>
						<Form.Control
							type='text'
							placeholder='image link'
							ref={imageLink}
							defaultValue={image?.link}
						/>
					</Form.Group>
				</Col>
				<Col xs={2}>
					<Form.Group
						className='mt-3 mb-3'
						controlId={`image${image?._id}'sLinkInput`}
					>
						<Button
							size='sm'
							variant='outline-success'
							disabled={isLoading}
							onClick={() =>
								handleAddALink(
									image?._id as string,
								)
							}
						>
							Save
						</Button>
					</Form.Group>
				</Col>
			</Row>
		</div>
	);
}

export default AddImageLink;
