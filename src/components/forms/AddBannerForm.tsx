import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import ErrorComponent, { IError } from '../Error';
import { createBanner } from '../../controllers/banner';
import { useAppDispatch } from '../../app/hooks';
import { TPreviewImage } from './EditProductForm';
import PreviewImage from '../dashboardComponents/PreviewImage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormGroup,
	TextField,
	Typography,
} from '@mui/material';
import { VisuallyHiddenInput } from '../../assets/styles';
import { LoadingButton } from '@mui/lab';

type AddBannerFormProps = {
	show: boolean;
	handleClose: () => void;
};

function AddBannerForm({
	show,
	handleClose,
}: AddBannerFormProps) {
	const dispatch = useAppDispatch();
	const [previewImages, setPreviewImages] = useState<
		TPreviewImage[] | null
	>(null);
	const [selectedImages, setSelectedImages] =
		useState<FileList | null>(null);

	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});

	const bannerNameRef = useRef<HTMLInputElement>(null);

	const handleRemovePreviewImages = async (
		imageId: string,
	) => {
		setPreviewImages((prevPreviewImages) => {
			return prevPreviewImages!.filter((image) => {
				return image.name !== imageId && image;
			});
		});

		const dataTransfer = new DataTransfer();
		for (const file of selectedImages!) {
			imageId !== file.name &&
				dataTransfer.items.add(file);
		}
		setSelectedImages(dataTransfer.files);
	};

	const handleChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;
		if (
			bannerNameRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'الرجاء قم بملئ جميع الحقول',
			});
		} else {
			setValidated(true);
			setError({
				status: true,
				message: 'looks good!',
			});
		}
	};

	const handleFileChange = async (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		if (e.target.files && e.target.files.length > 4) {
			setPreviewImages(null);
			setSelectedImages(null);
			setValidated(false);
			setError({
				status: false,
				message: 'You can upload Up To 4 images',
			});
		} else {
			setValidated(true);
			setError({
				status: true,
				message: 'looks good!',
			});
			await setSelectedImages(e.target.files);
			const images: TPreviewImage[] = [];
			for (const file of e.target.files!) {
				images.push({
					url: URL.createObjectURL(file),
					name: file?.name,
				});
			}
			await setPreviewImages(images);
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const form = e.currentTarget as HTMLFormElement;
			if (form.checkValidity() === false) {
				setError({
					status: false,
					message: 'invalid fields',
				});
			} else {
				await dispatch(
					createBanner({
						name: bannerNameRef.current
							?.value as string,
						images: selectedImages,
					}),
				);
				setIsLoading(false);
				handleClose();
				bannerNameRef.current!.value = '';
				setSelectedImages(null);
				setPreviewImages(null);
			}
		} catch (e: any) {
			setError({
				status: true,
				message: e.message,
			});
			setIsLoading(false);
		}
	};

	return (
		<main dir='rtl'>
			<Dialog open={show} onClose={handleClose}>
				<DialogTitle>
					<Typography variant='h3'>
						أضف لافتة جديدة
					</Typography>
				</DialogTitle>
				<DialogContent>
					<Box component='form' noValidate>
						<ErrorComponent error={error} />
						<FormGroup sx={{ m: 5 }}>
							<TextField
								required
								onChange={handleChange}
								type='text'
								label='الاسم'
								inputRef={bannerNameRef}
							/>
						</FormGroup>

						<FormGroup sx={{ m: 5 }}>
							<Button
								component='label'
								role={undefined}
								variant='contained'
								tabIndex={-1}
								startIcon={<CloudUploadIcon />}
							>
								Upload file
								<VisuallyHiddenInput
									type='file'
									onChange={handleFileChange}
									accept='image/*'
								/>
							</Button>
						</FormGroup>
						{previewImages &&
							previewImages?.map((image) => (
								<PreviewImage
									type='previewImage'
									key={image.name}
									path={image.url}
									imageId={image.name}
									handleRemove={
										handleRemovePreviewImages
									}
								/>
							))}
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						color='error'
						variant='outlined'
						sx={{ ml: 2 }}
					>
						الغاء
					</Button>
					<LoadingButton
						type='submit'
						startIcon='حفظ'
						variant='outlined'
						loading={isLoading}
						disabled={!validated}
						color='primary'
						onClick={handleSubmit}
					/>
				</DialogActions>
			</Dialog>
		</main>
	);
}

export default AddBannerForm;
