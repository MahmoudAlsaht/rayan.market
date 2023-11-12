import {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Button, Form, Modal, Image } from 'react-bootstrap';
import ErrorComponent, { IError } from '../Error';
import LoadingButton from '../LoadingButton';
import { createProduct } from '../../controllers/product';
import { fetchCategories } from '../../controllers/category';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Category } from '../../app/store/category';

type AddProductFormProps = {
	show: boolean;
	handleClose: () => void;
};

function AddProductForm({
	show,
	handleClose,
}: AddProductFormProps) {
	const dispatch = useAppDispatch();
	const [previewImages, setPreviewImages] = useState<
		string[] | null
	>(null);
	const [selectedImages, setSelectedImages] =
		useState<FileList | null>(null);

	const categories: Category[] | null = useAppSelector(
		(state) => state.categories,
	);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

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
			selectedImages == null ||
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
					status: true,
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
		if (!e.target.files) {
			setValidated(false);
			setError({
				status: false,
				message: 'please provide all the missing fields',
			});
		} else {
			const files: FileList | null = e.target.files;

			setSelectedImages(files);
			const images: string[] = [];
			for (const file of files) {
				images.push(URL.createObjectURL(file));
			}
			if (images.length > 4) {
				setValidated(false);
				setError({
					status: false,
					message:
						'You can only upload 4 images for each product',
				});
			} else if (images.length < 1) {
				setValidated(false);
				setError({
					status: false,
					message:
						'You must upload at least one image for each product',
				});
			} else {
				setPreviewImages(images);
				setValidated(true);
				setError({
					status: true,
					message: 'looks good!',
				});
			}
		}
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title className='text-muted'>
						Add A New Product
					</Modal.Title>
				</Modal.Header>
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
								<option value='defaultOption'>
									Select Category
								</option>
								{categories?.map((category) => (
									<option
										value={category?.id}
										key={category?.id}
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
								placeholder='Product Price'
								ref={productPriceRef}
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
							previewImages?.map(
								(image, index) => (
									<Image
										key={index}
										src={image}
										alt={`product-image${index}`}
										width={100}
										height={100}
										className='m-2'
									/>
								),
							)}
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

export default AddProductForm;
