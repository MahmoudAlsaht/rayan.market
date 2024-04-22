import ErrorComponent, { IError } from '../Error';
import { FormEvent, useRef, useState } from 'react';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormGroup,
	TextField,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
	TDistrict,
	createDistrict,
} from '../../controllers/district';

type AddDistrictFormProps = {
	show: boolean;
	handleClose: () => void;
	addToDistricts: (district: TDistrict | null) => void;
};

function AddDistrictForm({
	show,
	handleClose,
	addToDistricts,
}: AddDistrictFormProps) {
	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});

	const nameRef = useRef<HTMLInputElement>(null);
	const shippingFeesRef = useRef<HTMLInputElement>(null);

	const handleChange = () => {
		if (nameRef.current?.value === '') {
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
				const district = await createDistrict({
					name: nameRef.current?.value as string,
					shippingFees: shippingFeesRef.current
						?.value as string,
				});

				addToDistricts(district);

				setIsLoading(false);
				handleClose();
				nameRef.current!.value = '';
				shippingFeesRef.current!.value = '';
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
						أضف منطقة
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
								label='اسم المنطقة'
								inputRef={nameRef}
							/>
						</FormGroup>

						<FormGroup sx={{ m: 5 }}>
							<TextField
								required
								onChange={handleChange}
								type='number'
								label='رسوم التوصيل'
								inputRef={shippingFeesRef}
							/>
						</FormGroup>
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

export default AddDistrictForm;
