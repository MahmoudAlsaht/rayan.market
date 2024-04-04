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
	TDistrict,
	updateDistrict,
} from '../../controllers/district';

type EditDistrictFormProps = {
	show: boolean;
	handleClose: () => void;
	district: TDistrict | null;
	profileId: string;
	updateDistricts: (updatedDistrict: TDistrict | null) => void;
};

function EditDistrictForm({
	show,
	handleClose,
	district,
	profileId,
	updateDistricts,
}: EditDistrictFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});
	const nameRef = useRef<HTMLInputElement>(null);
	const shippingFeesRef = useRef<HTMLInputElement>(null);

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
				const name = nameRef.current?.value;
				const shippingFees =
					shippingFeesRef.current?.value;

				const updatedDistrict = await updateDistrict({
					name: name as string,
					districtId: district?._id as string,
					profileId: profileId,
					shippingFees: shippingFees as string,
				});

				updateDistricts(updatedDistrict);

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
				open={show}
				onClose={handleClose}
				dir='rtl'
				sx={{ height: '100%' }}
				fullScreen
			>
				<DialogContent>
					<Box component='form' noValidate>
						<Typography variant='h3'>
							تعديل {district?.name}
						</Typography>
						<ErrorComponent error={error} />

						<FormGroup sx={{ m: 5 }}>
							<TextField
								required
								type='text'
								label='اسم المنطقة'
								inputRef={nameRef}
								defaultValue={district?.name}
							/>
						</FormGroup>

						<FormGroup sx={{ m: 5 }}>
							<TextField
								required
								type='number'
								label='رسوم التوصيل'
								inputRef={shippingFeesRef}
								defaultValue={
									district?.shippingFees
								}
							/>
						</FormGroup>
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

export default EditDistrictForm;
