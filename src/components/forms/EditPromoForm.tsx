import { FormEvent, useRef, useState } from 'react';
import ErrorComponent, { IError } from '../Error';
import { updatePromo } from '../../controllers/promo';
import { useAppDispatch } from '../../app/hooks';
import { TPromoCode } from '../../app/store/promo';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	FormControlLabel,
	FormGroup,
	Grid,
	Switch,
	TextField,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type EditPromoFormProps = {
	show: boolean;
	handleClose: () => void;
	promo: TPromoCode | null;
};

function EditPromoForm({
	show,
	handleClose,
	promo,
}: EditPromoFormProps) {
	const dispatch = useAppDispatch();

	const [expired, setExpired] = useState(!promo?.expired);

	const [startDate, setStartDate] = useState<Dayjs | null>(
		dayjs(promo?.startDate, 'YYYY-MM-DD') || null,
	);
	const [endDate, setEndDate] = useState<Dayjs | null>(
		dayjs(promo?.endDate, 'YYYY-MM-DD') || null,
	);

	const handleExpired = () => setExpired(!expired);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});
	const codeRef = useRef<HTMLInputElement>(null);
	const discountRef = useRef<HTMLInputElement>(null);
	// const offerExpiresDateRef = useRef<HTMLInputElement>(null);

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
				const code = codeRef.current?.value;
				const discount = discountRef.current?.value;

				await dispatch(
					updatePromo({
						code: code || null,
						promoId: promo?._id as string,
						discount: discount || null,
						startDate:
							startDate?.format('YYYY-MM-DD') ||
							null,
						endDate:
							endDate?.format('YYYY-MM-DD') ||
							null,
						expired: !expired,
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
				open={show}
				onClose={handleClose}
				dir='rtl'
				sx={{ height: '100%' }}
				fullScreen
			>
				<DialogContent>
					<Box component='form' noValidate>
						<Typography variant='h3'>
							تعديل {promo?.code}
						</Typography>
						<ErrorComponent error={error} />

						<FormGroup sx={{ m: 5 }}>
							<FormControlLabel
								control={
									<Switch
										type='switch'
										id='custom-switch'
										checked={expired}
										onClick={handleExpired}
									/>
								}
								label={
									!expired
										? 'غير فعال'
										: 'فعال'
								}
							/>
						</FormGroup>

						<FormGroup sx={{ m: 5 }}>
							<TextField
								required
								type='text'
								label='كود الخصم'
								inputRef={codeRef}
								defaultValue={promo?.code}
							/>
						</FormGroup>

						<FormGroup sx={{ m: 5 }}>
							<TextField
								required
								type='number'
								label='نسبة الخصم'
								inputRef={discountRef}
								defaultValue={promo?.discount}
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
											setStartDate(
												newDate || null,
											)
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
											setEndDate(
												newDate || null,
											)
										}
									/>
								</Grid>
							</LocalizationProvider>
						</Grid>
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

export default EditPromoForm;
