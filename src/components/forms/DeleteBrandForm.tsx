import { useState } from 'react';
import { destroyBrand } from '../../controllers/brand';
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
			throw new Error(e);
		}
	};

	return (
		<main dir='rtl'>
			<Dialog open={show} onClose={handleClose}>
				<DialogTitle>
					<Typography variant='h4'>
						حذف القسم؟
					</Typography>
				</DialogTitle>
				<DialogContent className='text-danger'>
					هل أنت متأكد من حذف ({brandName})؟
				</DialogContent>
				<DialogActions>
					<Button
						variant='outlined'
						onClick={handleClose}
						sx={{ ml: 3 }}
					>
						إالغاء
					</Button>
					<LoadingButton
						type='submit'
						startIcon='تأكيد'
						loading={isLoading}
						color='error'
						variant='outlined'
						onClick={handleDeletion}
					/>
				</DialogActions>
			</Dialog>
		</main>
	);
}

export default DeleteBrandForm;
