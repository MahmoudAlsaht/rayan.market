import {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import ErrorComponent, { IError } from '../Error';
import { createBanner } from '../../controllers/banner';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
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
	FormControl,
	FormGroup,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	Typography,
} from '@mui/material';
import { VisuallyHiddenInput } from '../../assets/styles';
import { LoadingButton } from '@mui/lab';
import { TBrand } from '../../app/store/brand';
import { TCategory } from '../../app/store/category';
import { fetchBrands } from '../../controllers/brand';
import { fetchCategories } from '../../controllers/category';

type AddBannerFormProps = {
	show: boolean;
	handleClose: () => void;
};

const BANNER_TYPE_OPTIONS = [
	{ display: 'الرئيسية', value: 'main' },
	{ display: 'العروض', value: 'offers' },
	{ display: 'منزلية', value: 'homeProducts' },
	{ display: 'الأقسام', value: 'category' },
	{ display: 'العلامات التجارية', value: 'brand' },
];

function AddBannerForm({
	show,
	handleClose,
}: AddBannerFormProps) {
	const dispatch = useAppDispatch();
	const brands: (TBrand | null)[] = useAppSelector(
		(state) => state.brands,
	);
	const categories: (TCategory | null)[] = useAppSelector(
		(state) => state.categories,
	);

	const [previewImages, setPreviewImages] = useState<
		TPreviewImage[] | null
	>(null);
	const [selectedImages, setSelectedImages] =
		useState<FileList | null>(null);
	const [categoryValue, setCategoryValue] = useState('');
	const [brandValue, setBrandValue] = useState('');

	const [bannerTypeValue, setBannerTypeValue] =
		useState('normal');

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

	const handleFileChange = async (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		if (e.target.files && e.target.files.length > 4) {
			setPreviewImages(null);
			setSelectedImages(null);
			setValidated(false);
			setError({
				status: true,
				message: 'You can upload Up To 4 images',
			});
		} else {
			setValidated(true);
			setError({
				status: false,
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
					status: true,
					message: 'invalid fields',
				});
			} else {
				await dispatch(
					createBanner({
						name: bannerNameRef.current
							?.value as string,
						images: selectedImages,
						type: bannerTypeValue,
						category: categoryValue,
						brand: brandValue,
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

	useEffect(() => {
		dispatch(fetchBrands());
		dispatch(fetchCategories());
	}, [dispatch]);

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
							<FormControl>
								<InputLabel id='selectBannerType'>
									نوع اللافتة
								</InputLabel>
								<Select
									labelId='selectBannerType'
									id='bannerType-select'
									value={bannerTypeValue}
									onChange={(
										e: SelectChangeEvent,
									) => {
										setBannerTypeValue(
											e.target
												?.value as string,
										);
									}}
									label='اختر النوع'
								>
									{BANNER_TYPE_OPTIONS?.map(
										(type) => (
											<MenuItem
												value={type?.value?.toLowerCase()}
												key={type?.value?.toLowerCase()}
											>
												{type?.display}
											</MenuItem>
										),
									)}
								</Select>
							</FormControl>
						</FormGroup>

						{bannerTypeValue === 'category' && (
							<FormGroup>
								<FormControl
									sx={{ mx: 5, minWidth: 120 }}
								>
									<InputLabel id='selectCategory'>
										القسم
									</InputLabel>
									<Select
										labelId='selectCategory'
										id='category-select'
										value={categoryValue}
										onChange={(
											e: SelectChangeEvent,
										) => {
											setCategoryValue(
												e.target
													.value as string,
											);
										}}
										label='اختر القسم'
									>
										<MenuItem value=''>
											<em>اختر القسم</em>
										</MenuItem>
										{categories?.map(
											(category) => (
												<MenuItem
													value={
														category?._id
													}
													key={
														category?._id
													}
												>
													{
														category?.name
													}
												</MenuItem>
											),
										)}
									</Select>
								</FormControl>
							</FormGroup>
						)}

						{bannerTypeValue === 'brand' && (
							<FormGroup>
								<FormControl
									sx={{ mx: 5, minWidth: 120 }}
								>
									<InputLabel id='selectCategory'>
										العلامة التجارية
									</InputLabel>
									<Select
										labelId='selectBrand'
										id='brand-select'
										value={brandValue}
										onChange={(
											e: SelectChangeEvent,
										) => {
											setBrandValue(
												e.target
													?.value as string,
											);
										}}
										label='اختر علامة تجارية'
									>
										<MenuItem value=''>
											<em>
												اختر علامة تجارية
											</em>
										</MenuItem>
										{brands?.map((brand) => (
											<MenuItem
												value={
													brand?._id
												}
												key={brand?._id}
											>
												{brand?.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</FormGroup>
						)}

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
								<FormGroup sx={{ m: 5 }}>
									<PreviewImage
										type='previewImage'
										key={image.name}
										path={image.url}
										imageId={image.name}
										handleRemove={
											handleRemovePreviewImages
										}
									/>
								</FormGroup>
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
