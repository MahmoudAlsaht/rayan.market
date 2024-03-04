import {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import ErrorComponent, { IError } from '../Error';
import { updateProduct } from '../../controllers/product';
import { fetchProductsImages } from '../../controllers/productImages';
import { fetchCategories } from '../../controllers/category';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TCategory } from '../../app/store/category';
import {
	TProduct,
	TProductImage,
} from '../../app/store/product';
import PreviewImage from '../dashboardComponents/PreviewImage';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
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
import { TBrand } from '../../app/store/brand';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { fetchBrands } from '../../controllers/brand';
import { VisuallyHiddenInput } from '../../assets/styles';
import { LoadingButton } from '@mui/lab';

type EditProductFormProps = {
	show: boolean;
	handleClose: () => void;
	product: TProduct;
};

export type TPreviewImage = { url: string; name: string };

function EditProductForm({
	show,
	handleClose,
	product,
}: EditProductFormProps) {
	const dispatch = useAppDispatch();
	const [previewImages, setPreviewImages] = useState<
		TPreviewImage[] | null
	>(null);
	const [selectedImages, setSelectedImages] =
		useState<FileList | null>(null);
	const [isOffer, setIsOffer] = useState(product?.isOffer);

	const handleIsOffer = () => {
		setIsOffer(!isOffer);
	};

	const [productImages, setProductImages] = useState<
		(TProductImage | null)[]
	>([]);

	const categories: (TCategory | null)[] = useAppSelector(
		(state) => state.categories,
	);
	const brands: (TBrand | null)[] = useAppSelector(
		(state) => state.brands,
	);

	useEffect(() => {
		dispatch(fetchCategories());
		dispatch(fetchBrands());

		const updateImages = async () => {
			try {
				const images = await fetchProductsImages(
					product?._id as string,
				);
				setProductImages(images);
			} catch (e: any) {
				console.log(e);
			}
		};
		updateImages();
	}, [dispatch, product?._id]);

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

	const handleRemoveProductImages = (id: string) => {
		setProductImages((prevProductImages) => {
			return prevProductImages!.filter((image) => {
				return image?._id !== id && image;
			});
		});
	};

	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});
	const productNameRef = useRef<HTMLInputElement>(null);
	const productPriceRef = useRef<HTMLInputElement>(null);
	const productNewPriceRef = useRef<HTMLInputElement>(null);
	const productQuantityRef = useRef<HTMLInputElement>(null);
	const offerExpiresDateRef = useRef<HTMLInputElement>(null);
	const [categoryValue, setCategoryValue] = useState('');
	const [brandValue, setBrandValue] = useState('');

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
				const name = productNameRef.current?.value;
				const price = productPriceRef.current?.value;
				const newPrice =
					productNewPriceRef.current?.value;
				const quantity =
					productQuantityRef.current?.value;
				const category = categoryValue;
				const brand = brandValue;
				const offerExpiresDate =
					offerExpiresDateRef.current?.value;
				await dispatch(
					updateProduct({
						productId: product?._id,
						data: {
							name,
							price,
							newPrice,
							quantity,
							category,
							brand,
							images: selectedImages,
							isOffer,
							offerExpiresDate,
						},
					}),
				);
				setIsLoading(false);
				handleClose();
				productNameRef.current!.value = '';
				setCategoryValue('');
				setBrandValue('');
				productPriceRef.current!.value = '';
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

	const handleFileChange = (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		if (
			e.target.files &&
			productImages &&
			e.target.files!.length + productImages!.length > 4
		) {
			setPreviewImages(null);
			setSelectedImages(null);
			setValidated(false);
			setError({
				status: false,
				message: 'Yoy Can Only Upload Up to 4 Images',
			});
		} else {
			setValidated(true);
			setError({
				status: true,
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
				status: true,
				message: 'looks good!',
			});
		}
	};

	return (
		<div dir='rtl'>
			<Dialog
				open={show}
				onClose={handleClose}
				dir='rtl'
				sx={{ height: '100%' }}
			>
				<DialogContent>
					<Box component='form' noValidate>
						<Typography variant='h3'>
							تعديل {product?.name}
						</Typography>
						<ErrorComponent error={error} />

						<FormControl
							sx={{ mx: 5, minWidth: 120 }}
						>
							<InputLabel id='selectCategory'>
								{categories?.map(
									(category) =>
										category?._id ===
											product?.category
												?._id &&
										category?.name,
								)}
							</InputLabel>

							<Select
								labelId='selectCategory'
								id='category-select'
								value={categoryValue}
								onChange={(
									e: SelectChangeEvent,
								) =>
									setCategoryValue(
										e.target.value as string,
									)
								}
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
								{brands?.map(
									(brand) =>
										brand?._id ===
											product?.brand
												?._id &&
										brand?.name,
								)}
							</InputLabel>
							<Select
								labelId='selectBrand'
								id='brand-select'
								value={brandValue}
								onChange={(
									e: SelectChangeEvent,
								) =>
									setBrandValue(
										e.target.value as string,
									)
								}
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
								type='text'
								label='اسم المنتج'
								inputRef={productNameRef}
								defaultValue={product?.name}
							/>
						</FormGroup>

						<FormGroup sx={{ m: 5 }}>
							<TextField
								type='text'
								label='الكمية'
								inputRef={productQuantityRef}
								defaultValue={product?.quantity}
							/>
						</FormGroup>

						<FormGroup sx={{ m: 5 }}>
							<TextField
								type='text'
								label='السعر'
								inputRef={productPriceRef}
								defaultValue={product?.price}
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
								<FormGroup sx={{ m: 5 }}>
									<TextField
										type='text'
										label='السعر الجديد'
										inputRef={
											productNewPriceRef
										}
										defaultValue={
											product?.newPrice
										}
									/>
								</FormGroup>

								<FormGroup sx={{ m: 5 }}>
									<TextField
										type='text'
										label='مدة العرض'
										inputRef={
											offerExpiresDateRef
										}
										defaultValue={
											product?.offerExpiresDate
										}
										inputProps={{
											min: '1',
											max: '30',
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
									<PreviewImage
										type='PreviewImage'
										key={image?.name}
										path={image?.url}
										imageId={image?.name}
										handleRemove={
											handleRemovePreviewImages
										}
									/>
								))}
							<br />
							{productImages &&
								productImages?.map((image) => (
									<PreviewImage
										key={image?._id}
										imageId={image?._id}
										path={
											image?.path as string
										}
										dataType='product'
										handleRemove={
											handleRemoveProductImages
										}
										productId={product?._id}
									/>
								))}
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
						disabled={!validated}
						color='primary'
						variant='outlined'
						onClick={handleSubmit}
					/>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default EditProductForm;
