import { useState } from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { TPromoCode } from '../../app/store/promo';
import { Button, TableCell, TableRow } from '@mui/material';
import EditPromoForm from '../forms/EditPromoForm';

type PromoSettingsProps = {
	promo: TPromoCode | null;
	index: number;
};

function PromoSettings({ promo, index }: PromoSettingsProps) {
	const [show, setShow] = useState(false);

	const handleOpenEditForm = () => setShow(true);
	const handleCloseEditForm = () => setShow(false);

	const handleBrandDeletion = async () => setShow(!show);

	return (
		<TableRow>
			<TableCell align='right'>{index + 1}</TableCell>
			<TableCell align='right'>{promo?.code}</TableCell>
			<TableCell align='right'>
				{promo?.expired ? 'غير فعال' : 'فعال'}
			</TableCell>

			<TableCell align='right'>
				<Button onClick={handleOpenEditForm}>
					<EditNoteIcon color='warning' />
				</Button>

				<EditPromoForm
					show={show}
					handleClose={handleCloseEditForm}
					promo={promo}
				/>

				<Button onClick={handleBrandDeletion}>
					<DeleteIcon color='error' />
				</Button>
				{/* <DeleteBrandForm
							brandId={brand?._id as string}
							show={show}
							handleClose={handleBrandDeletion}
							brandName={brand?.name as string}
						/> */}
			</TableCell>
		</TableRow>
	);
}

export default PromoSettings;
