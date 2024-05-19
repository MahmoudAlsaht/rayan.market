import {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import ErrorComponent, { IError } from '../Error';
import { updateProduct } from '../../controllers/product';
import { fetchCategories } from '../../controllers/category';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TCategory } from '../../app/store/category';
import { TProduct } from '../../app/store/product';
import PreviewImage from '../dashboardComponents/PreviewImage';
import {
	Avatar,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	FormControl,
	FormGroup,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	Typography,
} from '@mui/material';
import { TBrand } from '../../app/store/brand';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { fetchBrands } from '../../controllers/brand';
import { VisuallyHiddenInput } from '../../assets/styles';
import { LoadingButton } from '@mui/lab';
import { TLabel } from '../../controllers/label';
import LabelInput from './LabelInput';
import ProductOfferHandling from './ProductOfferHandling';
import dayjs, { Dayjs } from 'dayjs';

type EditProductFormProps = {
	show: boolean;
	handleClose: () => void;
	product: TProduct | null;
};

export type TPreviewImage = { url: string; name: string };

function EditProductForm({
	show,
	handleClose,
	product,
}: EditProductFormProps) {
	const dispatch = useAppDispatch();
	const [previewImage, setPreviewImage] =
		useState<TPreviewImage | null>(null);

	const [selectedImage, setSelectedImage] =
		useState<File | null>(null);

	const [selectedLabels, setSelectedLabels] = useState<
		TLabel[] | null
	>(null);

	const [isOffer, setIsOffer] = useState(product?.isOffer);

	const [isEndDate, setIsEndDate] = useState(
		product?.isEndDate,
	);
	const [startOfferDate, setStartOfferDate] =
		useState<Dayjs | null>(
			dayjs(product?.startOfferDate, 'YYYY-MM-DD') || null,
		);
	const [endOfferDate, setEndOfferDate] =
		useState<Dayjs | null>(
			dayjs(product?.endOfferDate, 'YYYY-MM-DD') || null,
		);

	const handleIsOffer = () => setIsOffer(!isOffer);

	const handleIsEndDate = () => setIsEndDate(!isEndDate);

	const categories: (TCategory | null)[] = useAppSelector(
		(state) => state.categories,
	);
	const brands: (TBrand | null)[] = useAppSelector(
		(state) => state.brands,
	);

	useEffect(() => {
		dispatch(fetchCategories());
		dispatch(fetchBrands());
	}, [dispatch]);

	const handleRemovePreviewImage = async () => {
		setPreviewImage(null);
		setSelectedImage(null);
	};

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
						productId: product?._id as string,
						data: {
							name,
							price,
							newPrice,
							quantity,
							category,
							brand,
							image: selectedImage,
							isOffer,
							offerExpiresDate,
							labels: selectedLabels,
							startDate:
								startOfferDate?.format(
									'YYYY-MM-DD',
								),
							endDate:
								endOfferDate?.format(
									'YYYY-MM-DD',
								),
							isEndDate,
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
				setSelectedImage(null);
				setPreviewImage(null);
				setStartOfferDate(null);
				setEndOfferDate(null);
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

						<LabelInput
							selectedLabels={selectedLabels}
							setSelectedLabels={setSelectedLabels}
						/>

						<ProductOfferHandling
							isOffer={isOffer || false}
							isEndDate={isEndDate || false}
							handleIsEndDate={handleIsEndDate}
							handleIsOffer={handleIsOffer}
							startOfferDate={startOfferDate}
							endOfferDate={endOfferDate}
							offerExpiresDateRef={
								offerExpiresDateRef
							}
							productNewPriceRef={
								productNewPriceRef
							}
							setStartOfferDate={setStartOfferDate}
							setEndOfferDate={setEndOfferDate}
						/>

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
								product?.productImage && (
									<Avatar
										component='image'
										sx={{
											borderRadius: '10px',
											ml: 5,
											width: '100px',
											height: '100px',
										}}
										src={
											product?.productImage
												?.path
										}
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

export default EditProductForm;
