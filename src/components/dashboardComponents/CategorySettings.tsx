import { ChangeEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { updateCategory } from '../../controllers/category';
import DeleteCategoryForm from '../forms/DeleteCategoryForm';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { TCategory } from '../../app/store/category';
import {
	Button,
	TableCell,
	TableRow,
	TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { VisuallyHiddenInput } from '../../assets/jsStyles';

type CategorySettingsProps = {
	category: TCategory | null;
	index: number;
};

function CategorySettings({
	category,
	index,
}: CategorySettingsProps) {
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

	const handleCategoryUpdate = async () => {
		try {
			await dispatch(
				updateCategory({
					categoryId: category?._id as string,
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

	const handleCategoryDeletion = async () => setShow(!show);

	return (
		<TableRow>
			<TableCell align='right'>{index + 1}</TableCell>
			{!isEditing ? (
				<TableCell align='right'>
					{category?.name}
				</TableCell>
			) : (
				<TableCell align='right'>
					<TextField
						label='الاسم'
						type='text'
						defaultValue={category?.name}
						ref={nameRef}
					/>
				</TableCell>
			)}
			{!isEditing ? (
				<TableCell align='right'>
					{category?.image?.path && (
						<img
							src={category?.image?.path}
							width={50}
							height={50}
							alt={`${category?.name}'s image`}
						/>
					)}
				</TableCell>
			) : (
				<TableCell align='right'>
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
			<TableCell align='right'>
				{!isEditing ? (
					<legend>
						<Button onClick={handleIsEditing}>
							<EditNoteIcon color='warning' />
						</Button>

						<Button onClick={handleCategoryDeletion}>
							<DeleteIcon color='error' />
						</Button>
						<DeleteCategoryForm
							categoryId={category?._id as string}
							show={show}
							handleClose={handleCategoryDeletion}
							categoryName={
								category?.name as string
							}
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
							onClick={handleCategoryUpdate}
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

export default CategorySettings;
