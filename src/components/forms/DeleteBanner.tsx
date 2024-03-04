import { useState } from 'react';
import { destroyBanner } from '../../controllers/banner';
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
			setIsLoading(false);
		}
	};

	return (
		<main dir='rtl'>
			<Dialog open={show} onClose={handleClose}>
				<DialogTitle>
					<Typography variant='h3'>
						حذف اللافتة
					</Typography>
				</DialogTitle>

				<DialogContent>
					تأكيد حذف {bannerName}؟
				</DialogContent>

				<DialogActions>
					<Button
						variant='outlined'
						color='primary'
						sx={{ ml: 2 }}
						onClick={handleClose}
					>
						الغاء
					</Button>

					<LoadingButton
						startIcon='حذف'
						variant='outlined'
						color='error'
						loading={isLoading}
						onClick={handleDeletion}
					/>
				</DialogActions>
			</Dialog>
		</main>
	);
}

export default DeleteBannerForm;
