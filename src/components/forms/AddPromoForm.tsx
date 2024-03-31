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
	FormGroup,
	Grid,
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

type AddProductFormProps = {
	show: boolean;
	handleClose: () => void;
};

function AddProductForm({
	show,
	handleClose,
}: AddProductFormProps) {
	const dispatch = useAppDispatch();
	const [startDate, setStartDate] = useState<Dayjs | null>(
		null,
	);
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
			discountRef.current?.value <= 0 ||
			endDate == null ||
			startDate == null
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'الرجاء قم بملئ جميع الحقول',
			});
		} else {
			setValidated(true);
			setError({
				status: true,
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
						code: codeRef.current?.value as string,
						discount: discountRef.current?.value as
							| number
							| undefined,
						startDate:
							startDate?.format('YYYY-MM-DD'),
						endDate: endDate?.format('YYYY-MM-DD'),
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

export default AddProductForm;
