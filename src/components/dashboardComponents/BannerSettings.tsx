import { useState } from 'react';
import DeleteBannerForm from '../forms/DeleteBanner';
import EditBannerForm from '../forms/EditBannerForm';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { TBanner } from '../../app/store/banner';
// import { updateBannersActivity } from '../../controllers/banner';
// import { useAppDispatch } from '../../app/hooks';
import {
	IconButton,
	// Switch,
	TableCell,
	TableRow,
} from '@mui/material';

type BannerSettingsProps = {
	banner: TBanner;
	index: number;
};

function BannerSettings({ banner, index }: BannerSettingsProps) {
	const [show, setShow] = useState(false);
	// const dispatch = useAppDispatch();
	const [showEditBannerForm, setShowEditBannerForm] =
		useState(false);

	const handleClickEditBanner = () => {
		setShowEditBannerForm(!showEditBannerForm);
	};

	const handleBannerDeletion = async () => setShow(!show);

	// const handleClick = async () => {
	// 	try {
	// 		await dispatch(
	// 			updateBannersActivity({
	// 				bannerId: banner?._id,
	// 				// active: !banner?.active,
	// 			}),
	// 		);
	// 	} catch (e: any) {
	// 		console.error(e.message);
	// 	}
	// };

	return (
		<TableRow>
			<TableCell align='right'>{index + 1}</TableCell>
			<TableCell align='right'>
				{banner?.name.substring(0, 45)}
			</TableCell>

			{/* <TableCell
				align='right'
				sx={{
					color: !banner?.active
						? 'error.main'
						: 'primary.main',
				}}
			>
				<Switch
					type='switch'
					checked={banner?.active}
					onClick={handleClick}
				/>
				{banner?.active ? 'Activated' : 'Deactivated'}
			</TableCell> */}

			<TableCell align='right'>
				<EditBannerForm
					banner={banner}
					show={showEditBannerForm}
					handleClose={handleClickEditBanner}
				/>
				<IconButton onClick={handleClickEditBanner}>
					<EditNoteIcon />
				</IconButton>

				<IconButton onClick={handleBannerDeletion}>
					<DeleteIcon />
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
