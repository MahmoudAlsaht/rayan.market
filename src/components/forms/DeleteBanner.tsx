import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LoadingButton from '../LoadingButton';
import { destroyBanner } from '../../controllers/banner';
import { useAppDispatch } from '../../app/hooks';

type DeleteBannerFormProps = {
	show: boolean;
	handleClose: () => void;
	bannerName: string;
	bannerId: string;
};

function DeleteBannerForm({
	show,
	handleClose,
	bannerName,
	bannerId,
}: DeleteBannerFormProps) {
	const dispatch = useAppDispatch();

	const [isLoading, setIsLoading] = useState(false);

	const handleDeletion = async () => {
		try {
			setIsLoading(true);
			await dispatch(destroyBanner(bannerId));
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
						Delete Banner
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className='text-danger'>
					Delete {bannerName}?
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

export default DeleteBannerForm;
