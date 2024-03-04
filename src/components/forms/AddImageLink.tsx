import { useRef } from 'react';
import { updateImageLink } from '../../controllers/banner';
import { TBannerImage } from '../../app/store/banner';
import PreviewImage from '../dashboardComponents/PreviewImage';
import { useAppDispatch } from '../../app/hooks';
import { FormGroup, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

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
		<div dir='rtl'>
			<Grid container spacing={1}>
				<Grid xs={5} md={4}>
					<PreviewImage
						imageId={image?._id}
						path={image?.path as string}
						bannerId={bannerId}
						dataType='banner'
						handleRemove={handleRemoveBannerImages}
					/>
				</Grid>
				<Grid xs={5} md={6}>
					<FormGroup sx={{ mr: 2 }}>
						<TextField
							type='text'
							label='رابط للصورة'
							inputRef={imageLink}
							defaultValue={image?.link}
						/>
					</FormGroup>
				</Grid>
				<Grid xs={2}>
					<FormGroup>
						<LoadingButton
							color='primary'
							variant='outlined'
							loading={isLoading}
							startIcon='حفظ'
							onClick={() =>
								handleAddALink(
									image?._id as string,
								)
							}
						/>
					</FormGroup>
				</Grid>
			</Grid>
		</div>
	);
}

export default AddImageLink;
