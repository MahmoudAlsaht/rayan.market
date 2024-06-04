import { MouseEvent, useState } from 'react';
import DeleteProductOptionForm from '../forms/DeleteProductOptionForm';
import EditProductOptionsForm from '../forms/EditProductOptionsForm';
import {
	IconButton,
	Menu,
	MenuItem,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { TProductOption } from '../../controllers/productOptions';

type ProductOptionSettingsProps = {
	productOption: TProductOption | null;
	index: number;
	updateProductOptions: (
		productOption: TProductOption | null,
	) => void;
	deleteOption: (productOptionId: string) => void;
};

function ProductOptionSettings({
	productOption,
	index,
	updateProductOptions,
	deleteOption,
}: ProductOptionSettingsProps) {
	const [show, setShow] = useState(false);
	const [
		showEditProductOptionForm,
		setShowEditProductOptionForm,
	] = useState(false);

	const handleClickEditProduct = () => {
		setShowEditProductOptionForm(!showEditProductOptionForm);
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
					{productOption &&
						productOption?.optionName?.substring(
							0,
							45,
						)}
				</TableCell>

				<TableCell>
					<EditProductOptionsForm
						productOption={productOption}
						show={showEditProductOptionForm}
						handleClose={handleClickEditProduct}
						updateProductOptions={
							updateProductOptions
						}
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

					<DeleteProductOptionForm
						show={show}
						handleClose={handleProductDeletion}
						optionName={
							productOption?.optionName as string
						}
						productOptionId={
							productOption?._id as string
						}
						deleteOption={deleteOption}
					/>
				</TableCell>
			</TableRow>
		</>
	);
}

export default ProductOptionSettings;
