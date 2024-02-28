import {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ErrorComponent, { IError } from '../Error';
import LoadingButton from '../LoadingButton';
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

	useEffect(() => {
		dispatch(fetchCategories());
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
	const categoryRef = useRef<HTMLSelectElement>(null);

	const handleChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;
		if (
			productNameRef.current?.value === '' ||
			categoryRef.current?.value === 'defaultOption' ||
			productPriceRef.current?.value === '' ||
			productQuantityRef.current?.value === '' ||
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
				const category = categoryRef.current?.value;
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
							images: selectedImages,
							isOffer,
							offerExpiresDate,
						},
					}),
				);
				setIsLoading(false);
				handleClose();
				productNameRef.current!.value = '';
				categoryRef.current!.value = 'defaultOption';
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
			<Modal
				show={show}
				onHide={handleClose}
				className='productEditForm'
				style={{ height: '100%' }}
			>
				<Form
					noValidate
					validated={!validated}
					onSubmit={handleSubmit}
				>
					<Modal.Body className='text-dark'>
						<Modal.Header closeButton>
							<Modal.Title>
								Edit{' '}
								<span className='text-secondary'>
									{product && product?.name}
								</span>
							</Modal.Title>
						</Modal.Header>
						<ErrorComponent error={error} />

						<Form.Group
							className='mb-3 '
							controlId='selectCategory'
						>
							<Form.Select
								ref={categoryRef}
								onChange={handleChange}
							>
								<option
									value={
										product?.category?._id
									}
								>
									{categories?.map(
										(category) =>
											category?._id ===
												product?.category
													?._id &&
											category?.name,
									)}
								</option>
								{categories?.map((category) => {
									return (
										category?._id !==
											product?.category
												?._id && (
											<option
												value={
													category?._id
												}
												key={
													category?._id
												}
											>
												{category?.name}
											</option>
										)
									);
								})}
							</Form.Select>
						</Form.Group>

						<Form.Group
							className='mb-3'
							controlId='productNameFormInput '
						>
							<Form.Label className=' '>
								اسم المنتج
							</Form.Label>
							<Form.Control
								onChange={handleChange}
								type='text'
								placeholder='Product Name'
								ref={productNameRef}
								defaultValue={product?.name}
								className=''
							/>
						</Form.Group>

						<Form.Group
							className='mb-3'
							controlId='productQuantityFormInput'
						>
							<Form.Label className=''>
								الكمية
							</Form.Label>
							<Form.Control
								className=' mb-3'
								onChange={handleChange}
								type='text'
								placeholder='Product Quantity'
								ref={productQuantityRef}
								defaultValue={product?.quantity}
							/>
						</Form.Group>

						<Form.Group
							className='mb-3'
							controlId='productPriceFormInput'
						>
							<Form.Label className=''>
								السعر
							</Form.Label>
							<Form.Control
								className=''
								onChange={handleChange}
								type='text'
								placeholder='السعر'
								ref={productPriceRef}
								defaultValue={product?.price}
							/>
						</Form.Group>

						<Form.Group
							className=' mt-3 mb-3'
							controlId='productNameFormInput'
						>
							<Form.Check
								className=''
								type='switch'
								id='custom-switch'
								checked={isOffer}
								label={
									isOffer
										? 'الغاء العرض'
										: 'تقديم عرض'
								}
								onChange={handleIsOffer}
							/>
						</Form.Group>
						{isOffer && (
							<div>
								<Form.Group
									className='mb-3 '
									controlId='productPriceFormInput'
								>
									<Form.Label className=''>
										السعر الجديد
									</Form.Label>
									<Form.Control
										className=''
										onChange={handleChange}
										type='text'
										placeholder='السعر الجديد'
										ref={productNewPriceRef}
										defaultValue={
											product?.newPrice
										}
									/>
								</Form.Group>

								<Form.Group
									className='mb-3 '
									controlId='selectCategory'
								>
									<Form.Label>
										مدة العرض{' '}
									</Form.Label>

									<Form.Control
										onChange={handleChange}
										type='text'
										placeholder='مدة العرض'
										ref={offerExpiresDateRef}
										defaultValue={
											product?.offerExpiresDate
										}
										max={30}
										min={1}
									/>
								</Form.Group>
							</div>
						)}

						<Form.Group
							className='mb-3'
							controlId='productImagesFormInput'
						>
							<Form.Control
								type='file'
								multiple
								accept='image/*'
								onChange={handleFileChange}
							/>
						</Form.Group>
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
									path={image?.path as string}
									dataType='product'
									handleRemove={
										handleRemoveProductImages
									}
									productId={product?._id}
								/>
							))}
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant='secondary'
							onClick={handleClose}
						>
							Close
						</Button>
						<LoadingButton
							type='submit'
							body='Update'
							variant={
								!validated
									? 'secondary'
									: 'primary'
							}
							className={'w-50'}
							isLoading={isLoading}
							disabled={!validated}
						/>
					</Modal.Footer>
				</Form>
			</Modal>
		</div>
	);
}

export default EditProductForm;
