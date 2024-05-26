import ErrorComponent, { IError } from '../Error';
import {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { TUser } from '../../app/auth/auth';
import {
	createUser,
	fetchUser,
	fetchUsers,
} from '../../controllers/user';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type CreateCoUserFormProps = {
	show: boolean;
	handleClose: () => void;
	setUsers: (users: (TUser | null)[]) => void;
};

function CreateCoUserForm({
	show,
	handleClose,
	setUsers,
}: CreateCoUserFormProps) {
	const [roleValue, setRoleValue] = useState('');
	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});
	const admin: TUser | null = useAppSelector(
		(state) => state.user,
	);
	const dispatch = useAppDispatch();

	const phoneRef = useRef<HTMLInputElement | null>(null);
	const usernameRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const confirmPasswordRef = useRef<HTMLInputElement | null>(
		null,
	);

	const handleRoleChange = (e: SelectChangeEvent) => {
		setRoleValue(e.target.value as string);
		if (
			(e.target.value as string) === '' ||
			(e.target.value as string) === 'اختر صلاحية'
		) {
			setValidated(false);
		} else {
			setValidated(true);
		}
	};
	const handleChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;
		if (
			roleValue === '' ||
			phoneRef.current?.value === '' ||
			passwordRef.current?.value === '' ||
			usernameRef.current?.value === '' ||
			confirmPasswordRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: true,
				message: 'الرحاء إدخال جميع الحقول المطلوبة',
			});
		} else if (phoneRef.current?.value.length !== 10) {
			setValidated(false);
			setError({
				status: true,
				message: 'رقم الهاتف يجب أن يتكون من 10 أرقام',
			});
		} else if (
			passwordRef.current?.value !==
			confirmPasswordRef.current?.value
		) {
			setValidated(false);
			setError({
				status: true,
				message: 'كلمتي المرور غير متطابقتين',
			});
		} else if (passwordRef.current!.value.length < 6) {
			setValidated(false);
			setError({
				status: true,
				message: 'كلمة المرور يجب أن لا تقل عن 6 خانات',
			});
		} else if (usernameRef.current?.value === 'anonymous') {
			setValidated(false);
			setError({
				status: true,
				message: ' لا يمكنك اختيار اسم المستخدم هذا!',
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
			const form = e.currentTarget as HTMLFormElement;

			if (form.checkValidity() === false) {
				setError({
					status: true,
					message: 'حقول غبر صالحة',
				});
			} else {
				setIsLoading(true);
				await createUser(
					admin?._id as string,
					phoneRef.current?.value as string,
					passwordRef.current?.value as string,
					usernameRef.current?.value as string,
					roleValue,
				);
				const updatedUsers = await fetchUsers();
				setUsers(updatedUsers as (TUser | null)[]);
				handleClose();
				setIsLoading(false);
			}
		} catch (e: any) {
			setError({
				status: false,
				message: e.message,
			});
			setIsLoading(false);
		}
	};

	const roleOptions = [
		'اختر صلاحية',
		'Editor',
		'Staff',
		'Customer',
	];

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

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
						اضافة مستخدم
					</Typography>
				</DialogTitle>

				<Box>
					<DialogContent>
						<ErrorComponent error={error} />

						<Box
							component='form'
							noValidate
							onSubmit={handleSubmit}
							sx={{ mt: 3 }}
						>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										id='phone'
										label='رقم الهاتف'
										name='phone'
										type='number'
										autoComplete='phone Number'
										inputRef={phoneRef}
										onChange={handleChange}
									/>
								</Grid>

								<Grid item xs={12}>
									<TextField
										autoComplete='given-name'
										name='username'
										required
										fullWidth
										id='username'
										label='اسم المستخدم'
										autoFocus
										inputRef={usernameRef}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										name='password'
										label='كلمة المرور'
										type='password'
										id='password'
										autoComplete='new-password'
										inputRef={passwordRef}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										name='passwordConfirmation'
										label='تأكيد كلمة المرور'
										type='password'
										id='passwordConfirmation'
										autoComplete='new-password'
										inputRef={
											confirmPasswordRef
										}
										onChange={handleChange}
									/>
								</Grid>

								<Grid item xs={12}>
									<FormControl
										sx={{
											mx: 5,
											minWidth: 120,
										}}
									>
										<Select
											labelId='selectRole'
											id='role-select'
											value={roleValue}
											onChange={
												handleRoleChange
											}
										>
											{roleOptions?.map(
												(role) => (
													<MenuItem
														value={role?.toLowerCase()}
														key={role?.toLowerCase()}
													>
														{role}
													</MenuItem>
												),
											)}
										</Select>
									</FormControl>
								</Grid>
							</Grid>
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
								/>
							</DialogActions>
						</Box>
					</DialogContent>
				</Box>
			</Dialog>
		</div>
	);
}

export default CreateCoUserForm;
