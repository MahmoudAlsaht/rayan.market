import ErrorComponent, { IError } from '../Error';
import { FormEvent, useRef, useState } from 'react';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormGroup,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
	TProductOption,
	createProductOption,
} from '../../controllers/productOptions';
import { useParams } from 'react-router-dom';

type AddProductOptionsFormProps = {
	show: boolean;
	handleClose: () => void;
	productName: string;
	setProductOptions: (
		productOption: TProductOption | null,
	) => void;
};

const optionTypes = [
	{ option: 'weight', displayName: 'وزن' },
	{ option: 'flavor', displayName: 'نكهات' },
];

function AddProductOptionsForm({
	show,
	handleClose,
	productName,
	setProductOptions,
}: AddProductOptionsFormProps) {
	const { productId } = useParams();
	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});

	const [optionType, setOptionType] = useState('');
	const optionNameRef = useRef<HTMLInputElement>(null);
	const optionPriceRef = useRef<HTMLInputElement>(null);
	const optionQuantityRef = useRef<HTMLInputElement>(null);

	const handleChange = () => {
		if (
			optionNameRef.current?.value === '' ||
			optionType === '' ||
			optionQuantityRef.current?.value === ''
		) {
			setValidated(false);
			setError({
				status: true,
				message: 'الرجاء قم بملئ جميع الحقول',
			});
		} else {
			setValidated(true);
			setError({
				status: false,
				message: 'looks good!',
			});
		}
	};

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
				const res = await createProductOption({
					productId: productId as string,
					optionName: optionNameRef.current
						?.value as string,
					optionQuantity: optionQuantityRef.current
						?.value as string,
					optionPrice: optionPriceRef.current
						?.value as string,
					optionType: optionType,
				});
				setProductOptions(res);
				setIsLoading(false);
				handleClose();
				optionNameRef.current!.value = '';
				optionPriceRef.current!.value = '';
				setOptionType('');
				optionQuantityRef.current!.value = '';
			}
		} catch (e: any) {
			setError({
				status: true,
				message: 'Some thing went wrong',
			});
			setIsLoading(false);
		}
	};

	return (
		<div dir='rtl'>
			<Dialog
				dir='rtl'
				open={show}
				onClose={handleClose}
				fullScreen
			>
				<DialogTitle>
					<Typography variant='h3'>
						أضف فئة ل{`${productName}`}
					</Typography>
				</DialogTitle>

				<Box component='form' noValidate>
					<DialogContent>
						<ErrorComponent error={error} />

						<FormControl
							sx={{ mx: 5, minWidth: 120 }}
						>
							<InputLabel id='selectOptionType'>
								نوع الفئة
							</InputLabel>
							<Select
								labelId='selectOptionType'
								id='option-type-select'
								value={optionType}
								onChange={(
									e: SelectChangeEvent,
								) => {
									setOptionType(
										e.target.value as string,
									);
									handleChange();
								}}
								label='اختر نوع الفئة'
							>
								<MenuItem value=''>
									<em>اختر نوع الفئة</em>
								</MenuItem>
								{optionTypes?.map((option) => (
									<MenuItem
										value={option.option}
										key={option.option}
									>
										{option?.displayName}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormGroup sx={{ m: 5 }}>
							<TextField
								required
								onChange={handleChange}
								type='text'
								label='اسم الفئة'
								inputRef={optionNameRef}
							/>
						</FormGroup>

						{optionType !== 'weight' && (
							<FormGroup sx={{ m: 5 }}>
								<TextField
									required
									onChange={handleChange}
									type='number'
									label='الكمية'
									inputRef={optionQuantityRef}
								/>
							</FormGroup>
						)}

						{optionType === 'weight' && (
							<FormGroup sx={{ m: 5 }}>
								<TextField
									onChange={handleChange}
									type='number'
									label='السعر'
									inputRef={optionPriceRef}
								/>
							</FormGroup>
						)}
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
							type='submit'
							startIcon='أضف'
							variant='outlined'
							loading={isLoading}
							disabled={!validated}
							onClick={handleSubmit}
						/>
					</DialogActions>
				</Box>
			</Dialog>
		</div>
	);
}

export default AddProductOptionsForm;
