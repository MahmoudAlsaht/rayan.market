import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LoadingButton from '../LoadingButton';
import { destroyCategory } from '../../controllers/category';
import { useAppDispatch } from '../../app/hooks';

type DeleteCategoryFormProps = {
	show: boolean;
	handleClose: () => void;
	categoryName: string;
	categoryId: string;
};

function DeleteCategoryForm({
	show,
	handleClose,
	categoryName,
	categoryId,
}: DeleteCategoryFormProps) {
	const dispatch = useAppDispatch();

	const [isLoading, setIsLoading] = useState(false);

	const handleDeletion = async () => {
		try {
			setIsLoading(true);

			await dispatch(destroyCategory(categoryId));
			setIsLoading(false);
			handleClose();
		} catch (e: any) {
			console.log(e);
			setIsLoading(false);
		}
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title className='text-danger'>
						Delete Category
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className='text-danger'>
					Delete {categoryName}?
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
						body='Delete'
						variant={'danger'}
						className={'w-50'}
						isLoading={isLoading}
						handleClick={handleDeletion}
					/>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default DeleteCategoryForm;
