import { Modal, Form, Button } from 'react-bootstrap';
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
import LoadingButton from '../LoadingButton';

type HandleAddProductProps = {
	formType: string | null;
	handleClose: () => void;
};

function HandleAddProduct({
	formType,
	handleClose,
}: HandleAddProductProps) {
	const dispatch = useAppDispatch();
	const categories: (TCategory | null)[] = useAppSelector(
		(state) => state.categories,
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
						categoryId: categoryRef.current
							?.value as string,
						quantity: productQuantityRef.current
							?.value as string,
						price: productPriceRef.current
							?.value as string,
						newPrice:
							productNewPriceRef.current?.value ||
							null,
						isOffer: formType === 'offer',
						images: selectedImages,
					}),
				);
				setIsLoading(false);
				handleClose();
				productNameRef.current!.value = '';
				categoryRef.current!.value = 'defaultOption';
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
	}, [dispatch]);

	return (
		<Form
			noValidate
			validated={!validated}
			onSubmit={handleSubmit}
		>
			<Modal.Body className='text-muted'>
				<ErrorComponent error={error} />

				<Form.Group
					className='mb-3'
					controlId='selectCategory'
				>
					<Form.Select
						ref={categoryRef}
						onChange={handleChange}
					>
						<option value='defaultOption'>
							Select Category
						</option>
						{categories?.map((category) => (
							<option
								value={category?._id}
								key={category?._id}
							>
								{category?.name}
							</option>
						))}
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
						placeholder={
							formType === 'offer'
								? 'Old Price'
								: 'Product Price'
						}
						ref={productPriceRef}
					/>
				</Form.Group>

				{formType === 'offer' && (
					<Form.Group
						className='mt-3 mb-3'
						controlId='productPriceFormInput'
					>
						<Form.Control
							onChange={handleChange}
							type='number'
							placeholder='New Price'
							ref={productNewPriceRef}
						/>
					</Form.Group>
				)}

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
					/>
				</Form.Group>
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
							className='m-2'
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
						!validated ? 'secondary' : 'primary'
					}
					className={'w-50'}
					isLoading={isLoading}
					disabled={!validated}
				/>
			</Modal.Footer>
		</Form>
	);
}

export default HandleAddProduct;
