import { useState } from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { TPromoCode } from '../../app/store/promo';
import { Button, TableCell, TableRow } from '@mui/material';
import EditPromoForm from '../forms/EditPromoForm';
import DeletePromoForm from '../forms/DeletePromoForm';

type PromoSettingsProps = {
	promo: TPromoCode | null;
	index: number;
};

function PromoSettings({ promo, index }: PromoSettingsProps) {
	const [showEditForm, setShowEditForm] = useState(false);

	const [showDeleteForm, setShowDeleteForm] = useState(false);

	const handleOpenEditForm = () => setShowEditForm(true);
	const handleCloseEditForm = () => setShowEditForm(false);

	const handleOpenDeleteForm = () => setShowDeleteForm(true);
	const handleCloseDeleteForm = () => setShowDeleteForm(false);

	return (
		<TableRow>
			<TableCell>{index + 1}</TableCell>
			<TableCell>{promo?.code}</TableCell>
			<TableCell>
				{promo?.expired ? 'غير فعال' : 'فعال'}
			</TableCell>

			<TableCell>
				<Button onClick={handleOpenEditForm}>
					<EditNoteIcon color='warning' />
				</Button>

				<EditPromoForm
					show={showEditForm}
					handleClose={handleCloseEditForm}
					promo={promo}
				/>

				<Button onClick={handleOpenDeleteForm}>
					<DeleteIcon color='error' />
				</Button>
				<DeletePromoForm
					promoCode={promo?.code as string}
					show={showDeleteForm}
					handleClose={handleCloseDeleteForm}
					promoId={promo?._id as string}
				/>
			</TableCell>
		</TableRow>
	);
}

export default PromoSettings;
