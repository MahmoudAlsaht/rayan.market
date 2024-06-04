import { FormEvent, useRef, useState } from 'react';
import ErrorComponent, { IError } from '../Error';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	FormGroup,
	TextField,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
	TProductOption,
	updateProductOption,
} from '../../controllers/productOptions';
import { useParams } from 'react-router-dom';

type EditProductOptionsFormProps = {
	show: boolean;
	handleClose: () => void;
	productOption: TProductOption | null;
	updateProductOptions: (
		productOption: TProductOption | null,
	) => void;
};

function EditProductOptionsForm({
	show,
	handleClose,
	productOption,
	updateProductOptions,
}: EditProductOptionsFormProps) {
	const { productId } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});

	const optionNameRef = useRef<HTMLInputElement>(null);
	const optionPriceRef = useRef<HTMLInputElement>(null);
	const optionQuantityRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const form = e.currentTarget as HTMLFormElement;
			if (form.checkValidity() === false) {
				setError({
					status: true,
					message: 'invalid fields',
				});
			} else {
				const res = await updateProductOption({
					productId: productId as string,
					productOptionId:
						productOption?._id as string,
					optionName: optionNameRef.current
						?.value as string,
					optionQuantity: optionQuantityRef.current
						?.value as string,
					optionPrice: optionPriceRef.current
						?.value as string,
				});
				updateProductOptions(res);
				setIsLoading(false);
				handleClose();
				optionNameRef.current!.value = '';
				optionPriceRef.current!.value = '';
				optionQuantityRef.current!.value = '';
			}
		} catch (e: any) {
			setError({
				status: true,
				message: e.message,
			});
			setIsLoading(false);
		}
	};

	return (
		<div dir='rtl'>
			<Dialog
				open={show}
				onClose={handleClose}
				dir='rtl'
				sx={{ height: '100%' }}
				fullScreen
			>
				<DialogContent>
					<Box component='form' noValidate>
						<Typography variant='h3'>
							تعديل {productOption?.optionName}
						</Typography>
						<ErrorComponent error={error} />

						<FormGroup sx={{ m: 5 }}>
							<TextField
								required
								type='text'
								label='اسم الفئة'
								inputRef={optionNameRef}
								defaultValue={
									productOption?.optionName
								}
							/>
						</FormGroup>

						{productOption?.type !== 'weight' && (
							<FormGroup sx={{ m: 5 }}>
								<TextField
									required
									type='number'
									label='الكمية'
									inputRef={optionQuantityRef}
									defaultValue={
										productOption?.quantity
									}
								/>
							</FormGroup>
						)}

						{productOption?.type === 'weight' && (
							<FormGroup sx={{ m: 5 }}>
								<TextField
									type='number'
									label='السعر'
									inputRef={optionPriceRef}
									defaultValue={
										productOption?.price
									}
								/>
							</FormGroup>
						)}
					</Box>
				</DialogContent>

				<DialogActions>
					<Button
						variant='outlined'
						onClick={handleClose}
						color='error'
					>
						إلغاء
					</Button>
					<LoadingButton
						startIcon='حفظ'
						loading={isLoading}
						color='primary'
						variant='outlined'
						onClick={handleSubmit}
					/>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default EditProductOptionsForm;
