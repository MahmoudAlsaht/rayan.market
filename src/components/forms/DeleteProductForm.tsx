import { useState } from 'react';
import { destroyProduct } from '../../controllers/product';
import { useAppDispatch } from '../../app/hooks';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

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
			<Dialog open={show} onClose={handleClose}>
				<DialogTitle>
					<Typography>حذف المنتج</Typography>
				</DialogTitle>

				<DialogContent>
					<Typography>
						حذف المنتج ({productName})؟
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						variant='outlined'
						onClick={handleClose}
					>
						الغاء
					</Button>
					<LoadingButton
						type='submit'
						startIcon='حذف'
						loading={isLoading}
						onClick={handleDeletion}
						color='error'
					/>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default DeleteProductForm;
