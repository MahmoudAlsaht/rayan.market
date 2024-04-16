import { useState } from 'react';
import DeleteProductForm from '../forms/DeleteProductForm';
import EditProductForm from '../forms/EditProductForm';
import { TProduct } from '../../app/store/product';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, TableCell, TableRow } from '@mui/material';

type ProductSettingsProps = {
	product: TProduct;
	index: number;
};

function ProductSettings({
	product,
	index,
}: ProductSettingsProps) {
	const [show, setShow] = useState(false);
	const [showEditProductForm, setShowEditProductForm] =
		useState(false);

	const handleClickEditProduct = () => {
		setShowEditProductForm(!showEditProductForm);
	};

	const handleProductDeletion = async () => setShow(!show);

	return (
		<>
			<TableRow>
				<TableCell>{index + 1}</TableCell>
				<TableCell>
					{product && product?.name.substring(0, 45)}
				</TableCell>

				<TableCell>
					<EditProductForm
						product={product}
						show={showEditProductForm}
						handleClose={handleClickEditProduct}
					/>
					<IconButton onClick={handleClickEditProduct}>
						<EditNoteIcon color='warning' />
					</IconButton>

					<IconButton onClick={handleProductDeletion}>
						<DeleteIcon color='error' />
					</IconButton>

					<DeleteProductForm
						productId={product?._id}
						show={show}
						handleClose={handleProductDeletion}
						productName={product?.name}
					/>
				</TableCell>
			</TableRow>
		</>
	);
}

export default ProductSettings;
