import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LoadingButton from '../LoadingButton';
import { destroyProduct } from '../../controllers/product';
import { useAppDispatch } from '../../app/hooks';

type DeleteProductFormProps = {
	show: boolean;
	handleClose: () => void;
	productName: string;
	productId: string;
};

function DeleteProductForm({
	show,
	handleClose,
	productName,
	productId,
}: DeleteProductFormProps) {
	const dispatch = useAppDispatch();

	const [isLoading, setIsLoading] = useState(false);

	const handleDeletion = async () => {
		try {
			setIsLoading(true);
			await dispatch(destroyProduct(productId));
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
						Delete Product
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className='text-danger'>
					Delete {productName}?
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

export default DeleteProductForm;
