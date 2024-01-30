import { useState } from 'react';
import { Button } from 'react-bootstrap';
import DeleteBannerForm from '../forms/DeleteBanner';
import EditBannerForm from '../forms/EditBannerForm';
import { BsPen } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import { TBanner } from '../../app/store/banner';

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
		<>
			<tr>
				<td>{index + 1}</td>
				<td>{banner?.name}</td>

				<td>
					<EditBannerForm
						banner={banner}
						show={showEditBannerForm}
						handleClose={handleClickEditBanner}
					/>
					<Button
						variant='outline-warning'
						onClick={handleClickEditBanner}
					>
						<BsPen />
					</Button>
				</td>
				<td>
					<Button
						variant='outline-danger'
						onClick={handleBannerDeletion}
						className='ms-1'
					>
						<BsTrash />
					</Button>

					<DeleteBannerForm
						bannerId={banner?.id}
						show={show}
						handleClose={handleBannerDeletion}
						bannerName={banner?.name}
					/>
				</td>
			</tr>
		</>
	);
}

export default BannerSettings;
