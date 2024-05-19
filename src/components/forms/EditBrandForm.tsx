import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import ErrorComponent, { IError } from '../Error';
import { updateBrand } from '../../controllers/brand';
import { useAppDispatch } from '../../app/hooks';
import PreviewImage from '../dashboardComponents/PreviewImage';
import {
	Avatar,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	FormGroup,
	TextField,
	Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { VisuallyHiddenInput } from '../../assets/styles';
import { LoadingButton } from '@mui/lab';
import { TPreviewImage } from './EditProductForm';
import { TBrand } from '../../app/store/brand';

type EditBrandFormProps = {
	show: boolean;
	handleClose: () => void;
	brand: TBrand | null;
};

function EditBrandForm({
	show,
	handleClose,
	brand,
}: EditBrandFormProps) {
	const dispatch = useAppDispatch();
	const [previewImage, setPreviewImage] =
		useState<TPreviewImage | null>(null);

	const [selectedImage, setSelectedImage] =
		useState<File | null>(null);

	const handleRemovePreviewImage = async () => {
		setPreviewImage(null);
		setSelectedImage(null);
	};

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});
	const nameRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const form = e.currentTarget as HTMLFormElement;
			if (form.checkValidity() === false) {
				setError({
					status: true,
					message: 'invalid fields',
				});
			} else {
				await dispatch(
					updateBrand({
						name: nameRef.current?.value as string,
						file: selectedImage,
						brandId: brand?._id as string,
					}),
				);
				setIsLoading(false);
				handleClose();
				nameRef.current!.value = '';
				setSelectedImage(null);
				setPreviewImage(null);
			}
		} catch (e: any) {
			setError({
				status: true,
				message: e.message,
			});
			setIsLoading(false);
		}
	};

	const handleFileChange = async (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		setPreviewImage(null);
		setSelectedImage(null);

		await setSelectedImage(e.target.files![0]);
		const file = e.target.files![0];
		const image: TPreviewImage = {
			url: URL.createObjectURL(file),
			name: file?.name,
		};
		await setPreviewImage(image);
	};

	return (
		<div dir='rtl'>
			<Dialog
				open={show}
				onClose={handleClose}
				dir='rtl'
				sx={{ height: '100%' }}
				fullScreen
			>
				<DialogContent>
					<Box component='form' noValidate>
						<Typography variant='h3'>
							تعديل {brand?.name}
						</Typography>
						<ErrorComponent error={error} />

						<FormGroup sx={{ m: 5 }}>
							<TextField
								type='text'
								label='اسم القسم'
								inputRef={nameRef}
								defaultValue={brand?.name}
							/>
						</FormGroup>

						<Button
							component='label'
							variant='contained'
							tabIndex={-1}
							startIcon={<CloudUploadIcon />}
							sx={{ mx: 5 }}
						>
							Upload file
							<VisuallyHiddenInput
								type='file'
								onChange={handleFileChange}
								accept='image/*'
							/>
						</Button>

						<div
							style={{
								width: '110%',
								margin: '30px 0',
							}}
						>
							{previewImage && (
								<PreviewImage
									type='PreviewImage'
									key={previewImage?.name}
									path={previewImage?.url}
									imageId={previewImage?.name}
									handleRemove={
										handleRemovePreviewImage
									}
								/>
							)}
							{previewImage == null &&
								brand?.image && (
									<Avatar
										component='image'
										sx={{
											borderRadius: '10px',
											ml: 5,
											width: '100px',
											height: '100px',
										}}
										src={brand?.image?.path}
									/>
								)}
						</div>
					</Box>
				</DialogContent>

				<DialogActions>
					<Button
						variant='outlined'
						onClick={handleClose}
						color='error'
					>
						إلغاء
					</Button>
					<LoadingButton
						startIcon='حفظ'
						loading={isLoading}
						color='primary'
						variant='outlined'
						onClick={handleSubmit}
					/>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default EditBrandForm;
