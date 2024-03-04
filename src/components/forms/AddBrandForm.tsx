import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import ErrorComponent, { IError } from '../Error';
import { createBrand } from '../../controllers/brand';
import { useAppDispatch } from '../../app/hooks';
import { TPreviewImage } from './EditProductForm';
import PreviewImage from '../dashboardComponents/PreviewImage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import {
	Button,
	DialogActions,
	DialogContent,
	List,
	ListItem,
	TextField,
} from '@mui/material';
import { VisuallyHiddenInput } from '../../assets/styles';
import { LoadingButton } from '@mui/lab';

type AddBrandFormProps = {
	show: boolean;
	handleClose: () => void;
};

function AddBrandForm({ show, handleClose }: AddBrandFormProps) {
	const dispatch = useAppDispatch();

	const [previewImage, setPreviewImage] =
		useState<TPreviewImage | null>(null);
	const [selectedImage, setSelectedImage] =
		useState<File | null>(null);

	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});
	const brandNameRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;
		if (
			brandNameRef.current?.value === '' ||
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

	const handleRemovePreviewImage = async () => {
		setPreviewImage(null);
		setSelectedImage(null);
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
					createBrand({
						name: brandNameRef.current
							?.value as string,
						file: selectedImage,
					}),
				);
				setIsLoading(false);
				handleClose();
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
			<Dialog onClose={handleClose} open={show}>
				<DialogTitle>إضافة علامة تجارية</DialogTitle>
				<DialogContent>
					<ErrorComponent error={error} />

					<List>
						<ListItem>
							<TextField
								required
								onChange={handleChange}
								type='text'
								label='الاسم'
								inputRef={brandNameRef}
							/>
						</ListItem>
						{previewImage && (
							<ListItem>
								<PreviewImage
									type='previewImage'
									key={previewImage.name}
									path={previewImage.url}
									imageId={previewImage.name}
									handleRemove={
										handleRemovePreviewImage
									}
								/>
							</ListItem>
						)}

						<ListItem>
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
						</ListItem>
					</List>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>الغاء</Button>
					<LoadingButton
						onClick={handleSubmit}
						autoFocus
						disabled={!validated}
						startIcon='حفظ'
						loading={isLoading}
					/>
				</DialogActions>
			</Dialog>
		</main>
	);
}

export default AddBrandForm;
