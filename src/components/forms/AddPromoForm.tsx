import ErrorComponent, { IError } from '../Error';
import { FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { createPromo } from '../../controllers/promo';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormGroup,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type AddPromoFormProps = {
	show: boolean;
	handleClose: () => void;
};

function AddPromoForm({ show, handleClose }: AddPromoFormProps) {
	const dispatch = useAppDispatch();
	const [startDate, setStartDate] = useState<Dayjs | null>(
		null,
	);
	const [promoType, setPromoType] = useState('');

	const [endDate, setEndDate] = useState<Dayjs | null>(null);

	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});

	const codeRef = useRef<HTMLInputElement>(null);
	const discountRef = useRef<HTMLInputElement>(null);

	const handleChange = () => {
		if (
			codeRef.current?.value === '' ||
			discountRef.current?.value == null ||
			parseInt(discountRef.current?.value as string) <= 0
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
					status: false,
					message: 'invalid fields',
				});
			} else {
				await dispatch(
					createPromo({
						promoType,
						code: codeRef.current?.value as string,
						discount:
							discountRef.current?.value || null,
						startDate:
							startDate?.format('YYYY-MM-DD') ||
							null,
						endDate:
							endDate?.format('YYYY-MM-DD') ||
							null,
					}),
				);
				setIsLoading(false);
				handleClose();
				codeRef.current!.value = '';
				discountRef.current!.value = '';
				setStartDate(null);
				setEndDate(null);
			}
		} catch (e: any) {
			setError({
				status: true,
				message: e.message,
			});
			setIsLoading(false);
		}
	};

	const promoTypes = ['shipping', 'product'];

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
						أضف كوبون
					</Typography>
				</DialogTitle>

				<Box component='form' noValidate>
					<DialogContent>
						<ErrorComponent error={error} />

						<FormGroup sx={{ m: 5 }}>
							<TextField
								required
								onChange={handleChange}
								type='text'
								label='كود الخصم'
								inputRef={codeRef}
							/>
						</FormGroup>

						<FormControl
							sx={{
								mx: 5,
								width: { xs: '100%', sm: '93%' },
							}}
						>
							<InputLabel id='promoTypeSelect'>
								نوع الخصم
							</InputLabel>
							<Select
								labelId='promoTypeSelect'
								id='promoType-select'
								value={promoType}
								onChange={(
									e: SelectChangeEvent,
								) => {
									setPromoType(
										e.target.value as string,
									);
									handleChange();
								}}
								label='اختر القسم'
							>
								<MenuItem value=''>
									<em>اختر القسم</em>
								</MenuItem>
								{promoTypes?.map((type) => (
									<MenuItem
										value={type}
										key={type}
									>
										{type === 'shipping'
											? 'خصم على التوصيل'
											: 'خصم على سعر المنتج'}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormGroup sx={{ m: 5 }}>
							<TextField
								required
								onChange={handleChange}
								type='number'
								label='نسبة الخصم'
								inputRef={discountRef}
							/>
						</FormGroup>

						<Grid container sx={{ m: 5 }}>
							<LocalizationProvider
								dateAdapter={AdapterDayjs}
							>
								<Grid>
									<DatePicker
										slots={{
											leftArrowIcon:
												KeyboardArrowRightIcon,
											rightArrowIcon:
												KeyboardArrowLeftIcon,
										}}
										label='تاريخ البداية'
										value={startDate}
										onChange={(newDate) =>
											setStartDate(newDate)
										}
									/>
								</Grid>
								<Grid>
									<DatePicker
										slots={{
											leftArrowIcon:
												KeyboardArrowRightIcon,
											rightArrowIcon:
												KeyboardArrowLeftIcon,
										}}
										label='تاريخ النهاية'
										value={endDate}
										onChange={(newDate) =>
											setEndDate(newDate)
										}
									/>
								</Grid>
							</LocalizationProvider>
						</Grid>
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

export default AddPromoForm;
