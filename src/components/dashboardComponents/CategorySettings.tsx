import { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import LoadingButton from '../LoadingButton';
import { useAppDispatch } from '../../app/hooks';
import { updateCategory } from '../../controllers/category';
import DeleteCategoryForm from '../forms/DeleteCategoryForm';
import { BsPen } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';

type CategorySettingsProps = {
	categoryId: string;
	index: number;
	categoryName: string;
};

function CategorySettings({
	categoryId,
	categoryName,
	index,
}: CategorySettingsProps) {
	const dispatch = useAppDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [show, setShow] = useState(false);

	const nameRef = useRef<HTMLInputElement>(null);

	const handleIsEditing = () => setIsEditing(!isEditing);

	const handleCategoryUpdate = async () => {
		try {
			await dispatch(
				updateCategory({
					docId: categoryId,
					data: {
						name: nameRef.current?.value,
					},
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
					<td>{categoryName}</td>
				) : (
					<td>
						<input
							type='text'
							defaultValue={categoryName}
							ref={nameRef}
						/>
					</td>
				)}
				<td>
					{!isEditing ? (
						<legend>
							<Button
								variant='outline-warning'
								onClick={handleIsEditing}
							>
								<BsPen />
							</Button>

							<Button
								onClick={handleCategoryDeletion}
								variant='outline-danger'
								className='ms-1'
							>
								<BsTrash />
							</Button>
							<DeleteCategoryForm
								categoryId={categoryId}
								show={show}
								handleClose={
									handleCategoryDeletion
								}
								categoryName={categoryName}
							/>
						</legend>
					) : (
						<legend>
							<Button
								variant='outline-secondary'
								onClick={handleIsEditing}
							>
								Cancel
							</Button>

							<LoadingButton
								className='w-25 ms-1'
								variant='primary'
								body='Save'
								handleClick={
									handleCategoryUpdate
								}
								type='button'
								isLoading={isLoading}
							/>
						</legend>
					)}
				</td>
			</tr>
		</>
	);
}

export default CategorySettings;
