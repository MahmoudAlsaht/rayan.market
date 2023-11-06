import { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import LoadingButton from '../LoadingButton';
import { useAppDispatch } from '../../app/hooks';
import { updateCategory } from '../../controllers/category';

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

	const nameRef = useRef<HTMLInputElement>(null);

	const handleIsEditing = () => setIsEditing(!isEditing);

	const handleCategoryUpdate = async () => {
		try {
			await dispatch(
				updateCategory({
					collectionName: 'categories',
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
			console.log(e);
			setIsLoading(false);
		}
	};

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
				<td>{categoryId}</td>
				<td>
					{!isEditing ? (
						<Button
							variant='outline-warning'
							onClick={handleIsEditing}
						>
							Edit
						</Button>
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
