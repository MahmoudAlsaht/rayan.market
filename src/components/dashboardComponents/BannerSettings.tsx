import { useState } from 'react';
import DeleteBannerForm from '../forms/DeleteBanner';
import EditBannerForm from '../forms/EditBannerForm';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { TBanner } from '../../app/store/banner';
import { IconButton, TableCell, TableRow } from '@mui/material';

type BannerSettingsProps = {
	banner: TBanner;
	index: number;
};

function BannerSettings({ banner, index }: BannerSettingsProps) {
	const [show, setShow] = useState(false);

	const [showEditBannerForm, setShowEditBannerForm] =
		useState(false);

	const handleClickEditBanner = () => {
		setShowEditBannerForm(!showEditBannerForm);
	};

	const handleBannerDeletion = async () => setShow(!show);

	return (
		<TableRow>
			<TableCell>{index + 1}</TableCell>
			<TableCell>
				{banner?.name.substring(0, 45)}
			</TableCell>

			<TableCell>
				<EditBannerForm
					banner={banner}
					show={showEditBannerForm}
					handleClose={handleClickEditBanner}
				/>
				<IconButton onClick={handleClickEditBanner}>
					<EditNoteIcon color='warning' />
				</IconButton>

				<IconButton onClick={handleBannerDeletion}>
					<DeleteIcon color='error' />
				</IconButton>

				<DeleteBannerForm
					bannerId={banner?._id}
					show={show}
					handleClose={handleBannerDeletion}
					bannerName={banner?.name}
				/>
			</TableCell>
		</TableRow>
	);
}

export default BannerSettings;
