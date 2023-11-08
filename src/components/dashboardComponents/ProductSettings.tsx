import { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import LoadingButton from '../LoadingButton';
import { useAppDispatch } from '../../app/hooks';
import { updateProduct } from '../../controllers/product';
import DeleteProductForm from '../forms/DeleteProductForm';

type ProductSettingsProps = {
	productId: string;
	index: number;
	productName: string;
};

function ProductSettings({
	productId,
	productName,
	index,
}: ProductSettingsProps) {
	const dispatch = useAppDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [show, setShow] = useState(false);

	const nameRef = useRef<HTMLInputElement>(null);

	const handleIsEditing = () => setIsEditing(!isEditing);

	const handleProductUpdate = async () => {
		try {
			await dispatch(
				updateProduct({
					docId: productId,
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

	const handleProductDeletion = async () => setShow(!show);

	return (
		<>
			<tr>
				<td>{index + 1}</td>
				{!isEditing ? (
					<td>{productName}</td>
				) : (
					<td>
						<input
							type='text'
							defaultValue={productName}
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
								Edit
							</Button>

							<LoadingButton
								className='w-25 ms-1'
								variant='danger'
								body='Delete'
								handleClick={
									handleProductDeletion
								}
								type='button'
								isLoading={isLoading}
							/>
							<DeleteProductForm
								productId={productId}
								show={show}
								handleClose={
									handleProductDeletion
								}
								productName={productName}
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
								handleClick={handleProductUpdate}
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

export default ProductSettings;
