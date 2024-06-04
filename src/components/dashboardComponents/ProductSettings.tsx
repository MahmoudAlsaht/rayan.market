import { MouseEvent, useState } from 'react';
import DeleteProductForm from '../forms/DeleteProductForm';
import EditProductForm from '../forms/EditProductForm';
import { TProduct } from '../../app/store/product';
import {
	IconButton,
	Menu,
	MenuItem,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

type ProductSettingsProps = {
	product: TProduct | null;
	index: number;
	productType: string;
};

function ProductSettings({
	product,
	index,
	productType,
}: ProductSettingsProps) {
	const [show, setShow] = useState(false);
	const [showEditProductForm, setShowEditProductForm] =
		useState(false);

	const handleClickEditProduct = () => {
		setShowEditProductForm(!showEditProductForm);
		handleClose();
	};

	const handleProductDeletion = () => {
		setShow(!show);
		handleClose();
	};

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(
		null,
	);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

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

					<IconButton
						id='optionProductOptions'
						aria-controls={
							open ? 'positioned-menu' : undefined
						}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
					>
						<SettingsIcon />
					</IconButton>

					<Menu
						id='positioned-menu'
						aria-labelledby='optionProductOptions'
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
						dir='rtl'
					>
						{productType === 'options' && (
							<MenuItem onClick={handleClose}>
								<Link
									to={`/dashboard/settings/products/${product?._id}/productOptions`}
								>
									اضافة فئات للمنتج
								</Link>
							</MenuItem>
						)}

						<MenuItem
							onClick={handleClickEditProduct}
						>
							<Typography color='warning.main'>
								تعديل
							</Typography>
						</MenuItem>
						<MenuItem
							onClick={handleProductDeletion}
						>
							<Typography color='error'>
								حذف
							</Typography>
						</MenuItem>
					</Menu>

					<DeleteProductForm
						productId={product?._id as string}
						show={show}
						handleClose={handleProductDeletion}
						productName={product?.name as string}
					/>
				</TableCell>
			</TableRow>
		</>
	);
}

export default ProductSettings;
