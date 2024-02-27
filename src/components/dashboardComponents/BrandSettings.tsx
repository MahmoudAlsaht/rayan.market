import { ChangeEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { updateBrand } from '../../controllers/brand';
import DeleteBrandForm from '../forms/DeleteBrandForm';
import { BsPen } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import { TBrand } from '../../app/store/brand';
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

type BrandSettingsProps = {
	brand: TBrand | null;
	index: number;
};

function BrandSettings({ brand, index }: BrandSettingsProps) {
	const dispatch = useAppDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [show, setShow] = useState(false);

	const [selectedImage, setSelectedImage] =
		useState<File | null>(null);
	const nameRef = useRef<HTMLInputElement>(null);

	const handleIsEditing = () => setIsEditing(!isEditing);

	const handleFileChange = async (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		setSelectedImage(null);
		await setSelectedImage(e.target.files![0]);
	};

	const handleBrandUpdate = async () => {
		try {
			await dispatch(
				updateBrand({
					brandId: brand?._id as string,
					name: nameRef.current?.value as string,
					file: selectedImage,
				}),
			);
			setIsLoading(true);
			handleIsEditing();
			setIsLoading(false);
		} catch (e: any) {
			setIsLoading(false);
		}
	};

	const handleBrandDeletion = async () => setShow(!show);

	return (
		<>
			<tr>
				<td>{index + 1}</td>
				{!isEditing ? (
					<td>{brand?.name}</td>
				) : (
					<td>
						<input
							type='text'
							defaultValue={brand?.name}
							ref={nameRef}
						/>
					</td>
				)}
				{!isEditing ? (
					<td>
						{brand?.image?.path && (
							<img
								src={brand?.image?.path}
								width={50}
								height={50}
								alt={`${brand?.name}'s image`}
							/>
						)}
					</td>
				) : (
					<td>
						<Button
							component='label'
							role={undefined}
							variant='contained'
							tabIndex={-1}
							startIcon={<CloudUploadIcon />}
						>
							Upload file
							<VisuallyHiddenInput
								type='file'
								onChange={handleFileChange}
								accept='image/*'
							/>
						</Button>
					</td>
				)}
				<td>
					{!isEditing ? (
						<legend>
							<Button onClick={handleIsEditing}>
								<BsPen />
							</Button>

							<Button
								onClick={handleBrandDeletion}
								className='ms-1'
							>
								<BsTrash />
							</Button>
							<DeleteBrandForm
								brandId={brand?._id as string}
								show={show}
								handleClose={handleBrandDeletion}
								brandName={brand?.name as string}
							/>
						</legend>
					) : (
						<legend>
							<Button onClick={handleIsEditing}>
								Cancel
							</Button>

							<LoadingButton
								onClick={handleBrandUpdate}
								loading={isLoading}
								loadingPosition='center'
								variant='outlined'
								startIcon='Save'
							/>
						</legend>
					)}
				</td>
			</tr>
		</>
	);
}

export default BrandSettings;
