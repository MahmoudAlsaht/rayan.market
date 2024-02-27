import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LoadingButton from '../LoadingButton';
import { destroyBrand } from '../../controllers/brand';
import { useAppDispatch } from '../../app/hooks';

type DeleteBrandFormProps = {
	show: boolean;
	handleClose: () => void;
	brandName: string;
	brandId: string;
};

function DeleteBrandForm({
	show,
	handleClose,
	brandName,
	brandId,
}: DeleteBrandFormProps) {
	const dispatch = useAppDispatch();

	const [isLoading, setIsLoading] = useState(false);

	const handleDeletion = async () => {
		try {
			setIsLoading(true);

			await dispatch(destroyBrand(brandId));
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
						Delete Brand
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className='text-danger'>
					Delete {brandName}?
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

export default DeleteBrandForm;
