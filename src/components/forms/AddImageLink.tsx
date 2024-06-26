import { useRef, useState } from 'react';
import { updateImageLink } from '../../controllers/banner';
import { TBannerImage } from '../../app/store/banner';
import PreviewImage from '../dashboardComponents/PreviewImage';
import { useAppDispatch } from '../../app/hooks';
import {
	FormControlLabel,
	FormGroup,
	Grid,
	Switch,
	TextField,
} from '@mui/material';
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

	const [showForMobile, setShowForMobile] = useState(
		image?.showForMobile,
	);

	const handleSetShowForMobile = () => {
		setShowForMobile(!showForMobile);
	};

	const handleAddALink = async (imageId: string) => {
		try {
			setIsLoading(true);
			dispatch(
				updateImageLink({
					bannerId,
					imageId,
					link: imageLink.current?.value as string,
					showForMobile: showForMobile as boolean,
				}),
			);

			setIsLoading(false);
		} catch (e: any) {
			setIsLoading(false);
			throw new Error('something went wrong');
		}
	};

	return (
		<div dir='rtl'>
			<Grid container spacing={1}>
				<Grid xs={12} md={2}>
					<PreviewImage
						imageId={image?._id}
						path={image?.path as string}
						bannerId={bannerId}
						dataType='banner'
						handleRemove={handleRemoveBannerImages}
					/>
				</Grid>
				<Grid xs={12} md={6}>
					<FormGroup>
						<FormControlLabel
							control={
								<Switch
									type='switch'
									id='custom-switch'
									checked={showForMobile}
									onClick={
										handleSetShowForMobile
									}
								/>
							}
							label={
								showForMobile
									? ' فقط للهواتف'
									: 'فقط للويب'
							}
						/>
					</FormGroup>
					<FormGroup sx={{ mr: 2 }}>
						<TextField
							type='text'
							label='رابط للصورة'
							inputRef={imageLink}
							defaultValue={image?.link}
						/>
					</FormGroup>
				</Grid>
				<Grid xs={12} md={2}>
					<FormGroup
						sx={{ mt: { xs: 2, sm: 6 }, mr: 2 }}
					>
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
