import { useState } from 'react';
import { destroyCategory } from '../../controllers/category';
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
		<main dir='rtl'>
			<Dialog open={show} onClose={handleClose}>
				<DialogTitle>
					<Typography variant='h4'>
						حذف القسم؟
					</Typography>
				</DialogTitle>
				<DialogContent className='text-danger'>
					هل أنت متأكد من حذف ({categoryName})؟
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

export default DeleteCategoryForm;
