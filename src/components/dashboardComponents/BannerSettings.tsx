import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import DeleteBannerForm from '../forms/DeleteBanner';
import EditBannerForm from '../forms/EditBannerForm';
import { BsPen } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import { TBanner } from '../../app/store/banner';
import { updateBannersActivity } from '../../controllers/banner';
import { useAppDispatch } from '../../app/hooks';

type BannerSettingsProps = {
	banner: TBanner;
	index: number;
	updateBannersActivation: () => void;
};

function BannerSettings({
	banner,
	index,
	updateBannersActivation,
}: BannerSettingsProps) {
	const [show, setShow] = useState(false);
	const dispatch = useAppDispatch();
	const [showEditBannerForm, setShowEditBannerForm] =
		useState(false);

	const handleClickEditBanner = () => {
		setShowEditBannerForm(!showEditBannerForm);
	};

	const handleBannerDeletion = async () => setShow(!show);

	const handleClick = async () => {
		try {
			await dispatch(
				updateBannersActivity({
					bannerId: banner?.id,
					active: !banner?.active,
				}),
			);
		} catch (e: any) {
			console.error(e.message);
		}
	};

	return (
		<>
			<tr>
				<td>{index + 1}</td>
				<td>{banner?.name.substring(0, 45)}</td>
				<td
					className={
						!banner?.active
							? 'text-danger'
							: 'text-success'
					}
				>
					<Form.Group
						className='mt-3 mb-3'
						controlId='productNameFormInput'
					>
						<Form.Check
							type='switch'
							id='custom-switch'
							label={
								banner?.active
									? 'Activated'
									: 'Deactivated'
							}
							checked={banner?.active}
							onChange={handleClick}
						/>
					</Form.Group>
				</td>

				<td>
					<EditBannerForm
						banner={banner}
						show={showEditBannerForm}
						handleClose={handleClickEditBanner}
						updateBannersActivation={
							updateBannersActivation
						}
					/>
					<Button
						variant='outline-warning'
						onClick={handleClickEditBanner}
						className='me-2'
					>
						<BsPen />
					</Button>

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
