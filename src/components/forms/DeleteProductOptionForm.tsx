import { useState } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { deleteProductOption } from '../../controllers/productOptions';
import { useParams } from 'react-router-dom';

type DeleteProductOptionFormProps = {
	show: boolean;
	handleClose: () => void;
	optionName: string;
	productOptionId: string;
	deleteOption: (productOptionId: string) => void;
};

function DeleteProductOptionForm({
	show,
	handleClose,
	optionName,
	productOptionId,
	deleteOption,
}: DeleteProductOptionFormProps) {
	const { productId } = useParams();

	const [isLoading, setIsLoading] = useState(false);

	const handleDeletion = async () => {
		try {
			setIsLoading(true);
			const id = await deleteProductOption({
				productId: productId as string,
				productOptionId,
			});
			deleteOption(id);
			setIsLoading(false);
			handleClose();
		} catch (e: any) {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Dialog open={show} onClose={handleClose}>
				<DialogTitle>
					<Typography>حذف الفئة</Typography>
				</DialogTitle>

				<DialogContent>
					<Typography>
						حذف الفئة ({optionName})؟
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

export default DeleteProductOptionForm;
