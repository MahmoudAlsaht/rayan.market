import { ChangeEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { updateCategory } from '../../controllers/category';
import DeleteCategoryForm from '../forms/DeleteCategoryForm';
import { BsPen } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import { TCategory } from '../../app/store/category';
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
		<>
			<tr>
				<td>{index + 1}</td>
				{!isEditing ? (
					<td>{category?.name}</td>
				) : (
					<td>
						<input
							type='text'
							defaultValue={category?.name}
							ref={nameRef}
						/>
					</td>
				)}
				{!isEditing ? (
					<td>
						{category?.image?.path && (
							<img
								src={category?.image?.path}
								width={50}
								height={50}
								alt={`${category?.name}'s image`}
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
								onClick={handleCategoryDeletion}
								className='ms-1'
							>
								<BsTrash />
							</Button>
							<DeleteCategoryForm
								categoryId={
									category?._id as string
								}
								show={show}
								handleClose={
									handleCategoryDeletion
								}
								categoryName={
									category?.name as string
								}
							/>
						</legend>
					) : (
						<legend>
							<Button onClick={handleIsEditing}>
								Cancel
							</Button>

							<LoadingButton
								onClick={handleCategoryUpdate}
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

export default CategorySettings;
