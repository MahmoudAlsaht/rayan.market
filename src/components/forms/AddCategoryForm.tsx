import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
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
