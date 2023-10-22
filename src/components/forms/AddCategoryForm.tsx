import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button, Form, Modal, Image } from 'react-bootstrap';
import ErrorComponent, { IError } from '../Error';
import LoadingButton from '../LoadingButton';
import { createCategory } from '../../controllers/category';

type AddCategoryFormProps = {
	show: boolean;
	handleClose: () => void;
};

function AddCategoryForm({
	show,
	handleClose,
}: AddCategoryFormProps) {
	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [reviewImage, setReviewImage] = useState<
		string | null
	>(null);
	const [selectedImage, setSelectedImage] =
		useState<File | null>(null);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});
	const categoryNameRef = useRef<HTMLInputElement>(null);

	const updateImage = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const files: FileList | null = e.target.files;
		setSelectedImage(files[0]);
		setReviewImage(URL.createObjectURL(files[0]));
	};

	const handleFileChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLInputElement;

		updateImage(e as ChangeEvent<HTMLInputElement>);

		if (
			selectedImage == null ||
			selectedImage.name === '' ||
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

	const handleChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;
		if (
			categoryNameRef.current?.value === '' ||
			selectedImage == null ||
			selectedImage.name === '' ||
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
				await createCategory(
					categoryNameRef.current?.value as string,
					selectedImage,
				);
				setIsLoading(false);
				setSelectedImage(null);
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

						{reviewImage && (
							<Image
								className='rounded'
								src={reviewImage}
								width={130}
								height={130}
								alt='profileImage'
							/>
						)}
						<Form.Group
							controlId='categoryImage'
							className='mt-2 mb-3'
						>
							<Form.Control
								type='file'
								onChange={handleFileChange}
								required
							/>
						</Form.Group>
						<hr />

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
