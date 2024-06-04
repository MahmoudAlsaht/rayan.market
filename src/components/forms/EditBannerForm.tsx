import {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import ErrorComponent, { IError } from '../Error';
import { updateBanner } from '../../controllers/banner';
import { fetchBannersImages } from '../../controllers/bannerImages';
import { useAppDispatch } from '../../app/hooks';
import { TBanner, TBannerImage } from '../../app/store/banner';
import PreviewImage from '../dashboardComponents/PreviewImage';
import { TPreviewImage } from './EditProductForm';
import AddImageLink from './AddImageLink';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	FormGroup,
	TextField,
	Typography,
} from '@mui/material';
import { VisuallyHiddenInput } from '../../assets/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LoadingButton } from '@mui/lab';

type EditBannerFormProps = {
	show: boolean;
	handleClose: () => void;
	banner: TBanner | null;
};

function EditBannerForm({
	show,
	handleClose,
	banner,
}: EditBannerFormProps) {
	const dispatch = useAppDispatch();
	const [previewImages, setPreviewImages] = useState<
		any[] | null
	>(null);
	const [selectedImages, setSelectedImages] =
		useState<FileList | null>(null);

	const [bannerImages, setBannerImages] = useState<
		(TBannerImage | null)[]
	>([]);

	useEffect(() => {
		const updateImages = async () => {
			try {
				const images = await fetchBannersImages(
					banner?._id as string,
				);
				setBannerImages(images);
			} catch (e: any) {
				throw new Error('something went wrong');
			}
		};
		updateImages();
	}, [banner?._id]);

	const handleRemovePreviewImages = (id: string) => {
		setPreviewImages((prevPreviewImages) => {
			return prevPreviewImages!.filter((image) => {
				return image.name !== id && image;
			});
		});

		const dataTransfer = new DataTransfer();
		for (const file of selectedImages!) {
			id !== file.name && dataTransfer.items.add(file);
		}
		setSelectedImages(dataTransfer.files);
	};

	const handleRemoveBannerImages = (id: string) => {
		setBannerImages((prevBannerImages) => {
			return prevBannerImages!.filter(
				(image: TBannerImage | null) => {
					return (
						image?._id !== id &&
						(image as TBannerImage | null)
					);
				},
			);
		});
	};

	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});
	const bannerNameRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;
		if (
			bannerNameRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: true,
				message: 'الرجاء قم بملئ جميع الحقول',
			});
		} else {
			setValidated(true);
			setError({
				status: false,
				message: 'looks good!',
			});
		}
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
				const bannerName = bannerNameRef.current?.value;
				await dispatch(
					updateBanner({
						bannerId: banner?._id as string,
						currName: banner?.name as string,
						data: {
							bannerName,
							images: selectedImages,
						},
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

	const handleFileChange = (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		if (
			e.target.files &&
			bannerImages &&
			e.target.files!.length + bannerImages!.length > 4
		) {
			setPreviewImages(null);
			setSelectedImages(null);
			setValidated(false);
			setError({
				status: true,
				message: 'Yoy Can Only Upload Up to 4 Images',
			});
		} else {
			setValidated(true);
			setError({
				status: false,
				message: 'looks good!',
			});
			const files: FileList | null = e.target.files!;
			setSelectedImages(files);
			const images: TPreviewImage[] = [];
			for (const file of files) {
				images.push({
					url: URL.createObjectURL(file),
					name: file.name,
				});
			}
			setPreviewImages(images);
			setValidated(true);
			setError({
				status: false,
				message: 'looks good!',
			});
		}
	};

	return (
		<main dir='rtl'>
			<Dialog
				dir='rtl'
				open={show}
				onClose={handleClose}
				fullScreen
			>
				<DialogTitle>
					<Typography variant='h3'>
						تعديل اللافتة ({banner?.name})
					</Typography>
				</DialogTitle>
				<DialogContent>
					<Box component='form' noValidate>
						<ErrorComponent error={error} />
						<FormGroup sx={{ m: 5 }}>
							<TextField
								onChange={handleChange}
								type='text'
								label='الاسم'
								inputRef={bannerNameRef}
								defaultValue={banner?.name}
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
						<br />
						<Box>
							{previewImages && (
								<legend>
									<Typography
										variant='h6'
										sx={{
											mb: 5,
											mx: 5,
										}}
									>
										{previewImages?.length}{' '}
										صورة جديدة
									</Typography>
									{previewImages?.map(
										(image) => (
											<PreviewImage
												type='PreviewImage'
												key={image?.name}
												path={image?.url}
												imageId={
													image?.name
												}
												handleRemove={
													handleRemovePreviewImages
												}
											/>
										),
									)}
									<Divider sx={{ mb: 3 }} />
								</legend>
							)}
							{bannerImages && (
								<legend>
									<Typography
										variant='h6'
										sx={{
											mb: 5,
											mx: 5,
										}}
									>
										صور لافتة ({banner?.name}
										)
									</Typography>
									{bannerImages?.map(
										(image) => (
											<Box
												key={image?._id}
												sx={{ mb: 5 }}
											>
												<AddImageLink
													image={image}
													bannerId={
														banner?._id as string
													}
													setIsLoading={
														setIsLoading
													}
													isLoading={
														isLoading
													}
													handleRemoveBannerImages={
														handleRemoveBannerImages
													}
												/>
											</Box>
										),
									)}
								</legend>
							)}
						</Box>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						variant='outlined'
						onClick={handleClose}
						sx={{ ml: 2 }}
						color='error'
					>
						الغاء
					</Button>

					<LoadingButton
						variant='outlined'
						color='primary'
						startIcon='حفظ'
						loading={isLoading}
						disabled={!validated}
						onClick={handleSubmit}
					/>
				</DialogActions>
			</Dialog>
		</main>
	);
}

export default EditBannerForm;
