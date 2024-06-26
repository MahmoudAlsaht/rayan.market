import { ChangeEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { updateBrand } from '../../controllers/brand';
import DeleteBrandForm from '../forms/DeleteBrandForm';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { TBrand } from '../../app/store/brand';
import {
	Button,
	TableCell,
	TableRow,
	TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { VisuallyHiddenInput } from '../../assets/styles';

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
		<TableRow>
			<TableCell>{index + 1}</TableCell>
			{!isEditing ? (
				<TableCell>{brand?.name}</TableCell>
			) : (
				<TableCell>
					<TextField
						label='الاسم'
						type='text'
						defaultValue={brand?.name}
						inputRef={nameRef}
					/>
				</TableCell>
			)}
			{!isEditing ? (
				<TableCell>
					{brand?.image?.path && (
						<img
							src={brand?.image?.path}
							width={50}
							height={50}
							alt={`${brand?.name}'s image`}
						/>
					)}
				</TableCell>
			) : (
				<TableCell>
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
				</TableCell>
			)}
			<TableCell>
				{!isEditing ? (
					<legend>
						<Button onClick={handleIsEditing}>
							<EditNoteIcon color='warning' />
						</Button>

						<Button onClick={handleBrandDeletion}>
							<DeleteIcon color='error' />
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
						<Button
							variant='outlined'
							color='error'
							sx={{ mr: 1 }}
							onClick={handleIsEditing}
						>
							الغاء
						</Button>

						<LoadingButton
							onClick={handleBrandUpdate}
							loading={isLoading}
							loadingPosition='center'
							variant='outlined'
							startIcon='حفظ'
						/>
					</legend>
				)}
			</TableCell>
		</TableRow>
	);
}

export default BrandSettings;
