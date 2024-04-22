import { useState } from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { TDistrict } from '../../controllers/district';
import { Button, TableCell, TableRow } from '@mui/material';
import EditDistrictForm from '../forms/EditDistrictForm';
import DeleteDistrictForm from '../forms/DeleteDistrictForm';

type DistrictSettingsProps = {
	district: TDistrict | null;
	index: number;
	removeFromDistricts: (districtId: string) => void;
	updateDistricts: (updatedDistrict: TDistrict | null) => void;
};

function DistrictSettings({
	district,
	index,
	removeFromDistricts,
	updateDistricts,
}: DistrictSettingsProps) {
	const [showEditForm, setShowEditForm] = useState(false);

	const [showDeleteForm, setShowDeleteForm] = useState(false);

	const handleOpenEditForm = () => setShowEditForm(true);
	const handleCloseEditForm = () => setShowEditForm(false);

	const handleOpenDeleteForm = () => setShowDeleteForm(true);
	const handleCloseDeleteForm = () => setShowDeleteForm(false);

	return (
		<TableRow>
			<TableCell>{index + 1}</TableCell>
			<TableCell>{district?.name}</TableCell>
			<TableCell>{district?.shippingFees}</TableCell>

			<TableCell>
				<Button onClick={handleOpenEditForm}>
					<EditNoteIcon color='warning' />
				</Button>

				<EditDistrictForm
					show={showEditForm}
					handleClose={handleCloseEditForm}
					district={district}
					updateDistricts={updateDistricts}
				/>

				<Button onClick={handleOpenDeleteForm}>
					<DeleteIcon color='error' />
				</Button>

				<DeleteDistrictForm
					districtName={district?.name as string}
					show={showDeleteForm}
					handleClose={handleCloseDeleteForm}
					districtId={district?._id as string}
					removeFromDistricts={removeFromDistricts}
				/>
			</TableCell>
		</TableRow>
	);
}

export default DistrictSettings;
