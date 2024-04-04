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
import {
	deleteDistrict,
	fetchDistricts,
} from '../../controllers/district';

type DeletePromoFormProps = {
	show: boolean;
	handleClose: () => void;
	districtName: string;
	profileId: string;
	districtId: string;
	removeFromDistricts: (districtId: string) => void;
};

function DeletePromoForm({
	show,
	handleClose,
	districtName,
	districtId,
	profileId,
	removeFromDistricts,
}: DeletePromoFormProps) {
	const [isLoading, setIsLoading] = useState(false);

	const handleDeletion = async () => {
		try {
			setIsLoading(true);
			await deleteDistrict({ districtId, profileId });
			removeFromDistricts(districtId);
			setIsLoading(false);
			fetchDistricts(profileId);
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
					<Typography>حذف المنطقة</Typography>
				</DialogTitle>

				<DialogContent>
					<Typography>
						حذف المنطقة ({districtName})؟
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
