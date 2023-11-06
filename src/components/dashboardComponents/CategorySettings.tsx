import { useState } from 'react';
import { Button } from 'react-bootstrap';
import LoadingButton from '../LoadingButton';

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
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleIsEditing = () => setIsEditing(!isEditing);

	const handleCategoryUpdate = async () => {
		try {
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
