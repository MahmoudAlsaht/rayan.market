import { useState } from 'react';
import { Button } from 'react-bootstrap';
import LoadingButton from '../LoadingButton';
// import { useAppDispatch } from '../../app/hooks';
// import { updateProduct } from '../../controllers/product';
import DeleteProductForm from '../forms/DeleteProductForm';
import EditProductForm from '../forms/EditProductForm';
import { TProduct } from '../../app/store/product';

type ProductSettingsProps = {
	product: TProduct;
	index: number;
};

function ProductSettings({
	product,
	index,
}: ProductSettingsProps) {
	// const dispatch = useAppDispatch();
	// const [isLoading, setIsLoading] = useState(false);

	const [show, setShow] = useState(false);
	const [showEditProductForm, setShowEditProductForm] =
		useState(false);

	const handleClickEditProduct = () => {
		setShowEditProductForm(!showEditProductForm);
	};

	const handleProductDeletion = async () => setShow(!show);

	return (
		<>
			<tr>
				<td>{index + 1}</td>
				<td>{product?.name}</td>

				<td>
					<EditProductForm
						product={product}
						show={showEditProductForm}
						handleClose={handleClickEditProduct}
					/>
					<Button
						variant='outline-warning'
						onClick={handleClickEditProduct}
					>
						Edit
					</Button>

					<LoadingButton
						className='w-25 ms-1'
						variant='danger'
						body='Delete'
						handleClick={handleProductDeletion}
						type='button'
					/>
					<DeleteProductForm
						productId={product?.id}
						show={show}
						handleClose={handleProductDeletion}
						productName={product?.name}
					/>
				</td>
			</tr>
		</>
	);
}

export default ProductSettings;
