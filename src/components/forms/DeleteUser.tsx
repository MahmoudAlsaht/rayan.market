import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import ErrorComponent, { IError } from '../Error';
import { destroyUser } from '../../controllers/profile';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import {
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormGroup,
	TextField,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

function DeleteUser({
	profileId,
	isLoading,
	setIsLoading,
}: {
	profileId: string;
	isLoading: boolean;
	setIsLoading: (status: boolean) => void;
}) {
	const dispatch = useAppDispatch();

	const [validated, setValidated] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});
	const passwordRef = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleRemoveUser = async (e: FormEvent) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const form = e.currentTarget as HTMLFormElement;
			if (form.checkValidity() === false) {
				setError({
					status: true,
					message: 'حقول غير صالحة',
				});
			} else {
				await dispatch(
					destroyUser({
						password: passwordRef.current
							?.value as string,
						profileId: profileId,
					}),
				);
				handleClose();
				setIsLoading(false);
				navigate('/home');
			}
		} catch (e: any) {
			setError({
				status: true,
				message: e.message,
			});
			setIsLoading(false);
		}
	};

	const handleChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;
		if (
			passwordRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'الرجاء قم بإدخال جميع الحقول المطلوبة',
			});
		} else {
			setValidated(true);
			setError({
				status: true,
				message: 'looks good!',
			});
		}
	};

	return (
		<Container sx={{ m: 3 }}>
			<Typography variant='h3' sx={{ mb: 3 }}>
				حذف الحساب
			</Typography>

			<Button
				variant='outlined'
				color={!isLoading ? 'error' : 'secondary'}
				onClick={handleShow}
				disabled={isLoading}
			>
				حذف المستخدم
			</Button>

			<Dialog open={show} onClose={handleClose}>
				<DialogTitle>
					<Typography>
						هل أنت متأكد بأنك تريد أن تحذف الحساب؟
					</Typography>
				</DialogTitle>

				<DialogContent>
					<Box component='form' noValidate>
						{' '}
						<ErrorComponent error={error} />
						<FormGroup sx={{ mt: 3 }}>
							<TextField
								required
								onChange={handleChange}
								type='password'
								label='أدخل كلمة المرور لتأكيد الحذف'
								inputRef={passwordRef}
							/>
						</FormGroup>
					</Box>
				</DialogContent>

				<DialogActions>
					<Button
						variant='outlined'
						onClick={handleClose}
						color='primary'
						sx={{ ml: 2 }}
					>
						إالغاء
					</Button>
					<LoadingButton
						onClick={handleRemoveUser}
						startIcon='حذف الحساب'
						variant='outlined'
						color='error'
						loading={isLoading}
						disabled={!validated}
					/>
				</DialogActions>
			</Dialog>
		</Container>
	);
}

export default DeleteUser;
