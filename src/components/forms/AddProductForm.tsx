import ErrorComponent, { IError } from '../Error';
import {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { fetchCategories } from '../../controllers/category';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TCategory } from '../../app/store/category';
import { TPreviewImage } from './EditProductForm';
import { createProduct } from '../../controllers/product';
import PreviewImage from '../dashboardComponents/PreviewImage';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormGroup,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Switch,
	TextField,
	Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { VisuallyHiddenInput } from '../../assets/styles';
import { LoadingButton } from '@mui/lab';
import { TBrand } from '../../app/store/brand';
import { fetchBrands } from '../../controllers/brand';

type AddProductFormProps = {
	show: boolean;
	handleClose: () => void;
};

function AddProductForm({
	show,
	handleClose,
}: AddProductFormProps) {
	const dispatch = useAppDispatch();
	const categories: (TCategory | null)[] = useAppSelector(
		(state) => state.categories,
	);
	const brands: (TBrand | null)[] = useAppSelector(
		(state) => state.brands,
	);

	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});

	const [previewImages, setPreviewImages] = useState<
		TPreviewImage[] | null
	>(null);
	const [selectedImages, setSelectedImages] =
		useState<FileList | null>(null);

	const [isOffer, setIsOffer] = useState(false);

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

	const productNameRef = useRef<HTMLInputElement>(null);
	const productPriceRef = useRef<HTMLInputElement>(null);
	const productNewPriceRef = useRef<HTMLInputElement>(null);
	const productQuantityRef = useRef<HTMLInputElement>(null);
	const [categoryValue, setCategoryValue] = useState('');
	const [brandValue, setBrandValue] = useState('');
	const offerExpiresDateRef = useRef<HTMLInputElement>(null);

	const handleIsOffer = () => {
		setIsOffer(!isOffer);
	};

	const handleChange = () => {
		console.log(productNameRef.current?.value);

		if (
			productNameRef.current?.value === '' ||
			categoryValue === '' ||
			brandValue === '' ||
			productPriceRef.current?.value === '' ||
			productQuantityRef.current?.value === ''
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
					createProduct({
						name: productNameRef.current
							?.value as string,
						categoryId: categoryValue,
						brandId: brandValue,
						quantity: productQuantityRef.current
							?.value as string,
						price: productPriceRef.current
							?.value as string,
						newPrice:
							productNewPriceRef.current?.value ||
							null,
						isOffer,
						offerExpiresDate:
							offerExpiresDateRef.current?.value ||
							null,
						images: selectedImages,
					}),
				);
				setIsLoading(false);
				handleClose();
				productNameRef.current!.value = '';
				setCategoryValue('');
				setBrandValue('');
				productPriceRef.current!.value = '';
				productNewPriceRef.current!.value = '';
				productQuantityRef.current!.value = '';
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
		dispatch(fetchCategories());
		dispatch(fetchBrands());
	}, [dispatch]);
	return (
		<div dir='rtl'>
			<Dialog dir='rtl' open={show} onClose={handleClose}>
				<DialogTitle>
					<Typography variant='h3'>
						أضف منتج جديد
					</Typography>
				</DialogTitle>

				<Box component='form' noValidate>
					<DialogContent>
						<ErrorComponent error={error} />

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
										e.target.value as string,
									);
									handleChange();
								}}
								label='اختر القسم'
							>
								<MenuItem value=''>
									<em>اختر القسم</em>
								</MenuItem>
								{categories?.map((category) => (
									<MenuItem
										value={category?._id}
										key={category?._id}
									>
										{category?.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl
							sx={{ mx: 5, minWidth: 120 }}
						>
							<InputLabel id='selectBrand'>
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
										e.target.value as string,
									);
									handleChange();
								}}
								label='اختر علامة تجارية'
							>
								<MenuItem value=''>
									<em>اختر علامة تجارية</em>
								</MenuItem>
								{brands?.map((brand) => (
									<MenuItem
										value={brand?._id}
										key={brand?._id}
									>
										{brand?.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormGroup sx={{ m: 5 }}>
							<TextField
								required
								onChange={handleChange}
								type='text'
								label='اسم المنتج'
								inputRef={productNameRef}
							/>
						</FormGroup>

						<FormGroup sx={{ m: 5 }}>
							<TextField
								required
								onChange={handleChange}
								type='number'
								label='الكمية'
								inputRef={productQuantityRef}
							/>
						</FormGroup>

						<FormGroup sx={{ m: 5 }}>
							<TextField
								required
								onChange={handleChange}
								type='number'
								label='السعر'
								inputRef={productPriceRef}
							/>
						</FormGroup>

						<FormGroup sx={{ m: 5 }}>
							<FormControlLabel
								control={
									<Switch
										type='switch'
										id='custom-switch'
										checked={isOffer}
										onClick={handleIsOffer}
									/>
								}
								label={
									isOffer
										? 'الغاء العرض'
										: 'تقديم عرض'
								}
							/>
						</FormGroup>

						{isOffer && (
							<div>
								<FormGroup sx={{ mx: 5 }}>
									<TextField
										onChange={handleChange}
										type='number'
										label='السعر الجدبد'
										inputRef={
											productNewPriceRef
										}
									/>
								</FormGroup>

								<FormGroup sx={{ m: 5 }}>
									<TextField
										onChange={handleChange}
										type='number'
										label='مدة العرض'
										required
										inputRef={
											offerExpiresDateRef
										}
										inputProps={{
											min: '1',
											max: '10',
										}}
									/>
								</FormGroup>
							</div>
						)}

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
								multiple
							/>
						</Button>

						<div
							style={{
								width: '110%',
								margin: '30px 0',
							}}
						>
							{previewImages &&
								previewImages?.map((image) => (
									<span
										style={{
											marginRight: '.8rem',
										}}
									>
										<PreviewImage
											type='previewImage'
											key={image.name}
											path={image.url}
											imageId={image.name}
											handleRemove={
												handleRemovePreviewImages
											}
										/>
									</span>
								))}
						</div>
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
							type='submit'
							startIcon='أضف'
							variant='outlined'
							loading={isLoading}
							disabled={!validated}
							onClick={handleSubmit}
						/>
					</DialogActions>
				</Box>
			</Dialog>
		</div>
	);
}

export default AddProductForm;
