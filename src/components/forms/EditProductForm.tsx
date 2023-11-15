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
import { createProduct } from '../../controllers/product';
import { fetchProductsImages } from '../../controllers/productImages';
import { fetchCategories } from '../../controllers/category';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Category } from '../../app/store/category';
import { TProduct } from '../../app/store/product';
import PreviewImage from '../dashboardComponents/PreviewImage';
import { DocumentData } from 'firebase/firestore';

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

	const [productImages, setProductImages] = useState<
		(DocumentData | undefined)[] | null | undefined
	>(null);

	const categories: Category[] | null = useAppSelector(
		(state) => state.categories,
	);

	useEffect(() => {
		dispatch(fetchCategories());
		const updateImages = async () => {
			try {
				const images = await fetchProductsImages(
					product?.images,
				);
				setProductImages(images);
			} catch (e: any) {
				console.log(e);
			}
		};
		updateImages();
	}, [dispatch, product?.images]);

	const handleRemovePreviewImages = async (id: string) => {
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

	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});
	const productNameRef = useRef<HTMLInputElement>(null);
	const productPriceRef = useRef<HTMLInputElement>(null);
	const productQuantityRef = useRef<HTMLInputElement>(null);
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
				message: 'please provide all the missing fields',
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
				await dispatch(
					createProduct({
						name: productNameRef.current
							?.value as string,
						categoryId: categoryRef.current
							?.value as string,
						quantity: productQuantityRef.current
							?.value as string,
						price: productPriceRef.current
							?.value as string,
						images: selectedImages,
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
		<>
			<Modal
				show={show}
				onHide={handleClose}
				fullscreen
				className='productEditForm'
			>
				<Form
					noValidate
					validated={!validated}
					onSubmit={handleSubmit}
					style={{ width: '100%' }}
				>
					<Modal.Body className='text-muted'>
						<ErrorComponent error={error} />

						<Form.Group
							className='mt-3 mb-3'
							controlId='selectCategory'
						>
							<Form.Select
								ref={categoryRef}
								onChange={handleChange}
							>
								<option
									value={product?.categoryId}
								>
									{categories?.map(
										(category) =>
											category?.id ===
												product?.categoryId &&
											category?.name,
									)}
								</option>
								{categories?.map((category) => {
									return (
										category?.id !==
											product?.categoryId && (
											<option
												value={
													category?.id
												}
												key={
													category?.id
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
							className='mt-3 mb-3'
							controlId='productNameFormInput'
						>
							<Form.Control
								required
								onChange={handleChange}
								type='text'
								placeholder='Product Name'
								ref={productNameRef}
								defaultValue={product?.name}
							/>
						</Form.Group>

						<Form.Group
							className='mt-3 mb-3'
							controlId='productPriceFormInput'
						>
							<Form.Control
								required
								onChange={handleChange}
								type='number'
								placeholder='Product Price'
								ref={productPriceRef}
								defaultValue={product?.price}
							/>
						</Form.Group>

						<Form.Group
							className='mt-3 mb-3'
							controlId='productQuantityFormInput'
						>
							<Form.Control
								required
								onChange={handleChange}
								type='number'
								placeholder='Product Quantity'
								ref={productQuantityRef}
								defaultValue={product?.quantity}
							/>
						</Form.Group>

						<Form.Group
							controlId='productImagesFormInput'
							className='mt-2 mb-3'
						>
							<Form.Control
								type='file'
								multiple
								onChange={handleFileChange}
								required
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
									key={image?.id}
									imageId={image?.id}
									path={image?.path}
									filename={image?.filename}
									product={product}
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
							body='Add'
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
		</>
	);
}

export default EditProductForm;
