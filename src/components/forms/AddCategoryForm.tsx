import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ErrorComponent, { IError } from '../Error';
import LoadingButton from '../LoadingButton';
import { createCategory } from '../../controllers/category';
import { useAppDispatch } from '../../app/hooks';
import { TPreviewImage } from './EditProductForm';
import PreviewImage from '../dashboardComponents/PreviewImage';

type AddCategoryFormProps = {
	show: boolean;
	handleClose: () => void;
};

function AddCategoryForm({
	show,
	handleClose,
}: AddCategoryFormProps) {
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
	const categoryNameRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;
		if (
			categoryNameRef.current?.value === '' ||
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
					createCategory({
						name: categoryNameRef.current
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
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title className='text-muted'>
						Add A New Category
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
							controlId='categoryNameFormInput'
						>
							<Form.Control
								required
								onChange={handleChange}
								type='text'
								placeholder='Category Name'
								ref={categoryNameRef}
							/>
						</Form.Group>

						<Form.Group
							controlId='productImagesFormInput'
							className='mt-2 mb-3'
						>
							<Form.Control
								type='file'
								multiple
								accept='image/*'
								onChange={handleFileChange}
							/>
						</Form.Group>
						{previewImage && (
							<PreviewImage
								type='previewImage'
								key={previewImage.name}
								path={previewImage.url}
								imageId={previewImage.name}
								handleRemove={
									handleRemovePreviewImage
								}
								className='m-2'
							/>
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

export default AddCategoryForm;
