import { useState } from 'react';
import {
	deletePromo,
	fetchPromos,
} from '../../controllers/promo';
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

type DeletePromoFormProps = {
	show: boolean;
	handleClose: () => void;
	promoCode: string;
	promoId: string;
};

function DeletePromoForm({
	show,
	handleClose,
	promoCode,
	promoId,
}: DeletePromoFormProps) {
	const dispatch = useAppDispatch();

	const [isLoading, setIsLoading] = useState(false);

	const handleDeletion = async () => {
		try {
			setIsLoading(true);
			await dispatch(deletePromo(promoId));
			setIsLoading(false);
			dispatch(fetchPromos());
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
					<Typography>حذف الكوبون</Typography>
				</DialogTitle>

				<DialogContent>
					<Typography>
						حذف الكوبون ({promoCode})؟
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

export default DeletePromoForm;
