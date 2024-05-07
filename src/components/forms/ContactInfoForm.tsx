import {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import {
	TContactInfo,
	createNewContactInfo,
	updateUserContactInfo,
} from '../../controllers/contact';
import ErrorComponent, { IError } from '../Error';
import { useParams, useNavigate } from 'react-router-dom';
import {
	Box,
	Button,
	Container,
	FormControl,
	FormGroup,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	Typography,
} from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { LoadingButton } from '@mui/lab';
import {
	TDistrict,
	fetchDistricts,
} from '../../controllers/district';

function ContactInfoForm({
	contact,
}: {
	contact: TContactInfo | null;
}) {
	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [districts, setDistricts] = useState<
		(TDistrict | null)[]
	>([]);

	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});
	const { profileId } = useParams();
	const navigate = useNavigate();

	const [districtValue, setDistrictValue] = useState('');

	const contactNumberRef = useRef<HTMLInputElement>(null);

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
				const data = {
					district: districtValue,
					contactNumber: contactNumberRef.current
						?.value as string,
				};
				if (contact) {
					await updateUserContactInfo({
						data,
						contactId: contact?._id,
						profileId: profileId as string,
					});
				} else {
					await createNewContactInfo(
						profileId as string,
						data,
					);
				}
				setIsLoading(false);
				setIsEditing(false);

				setDistrictValue('');
				contactNumberRef.current!.value = '';
				navigate(-1);
			}
		} catch (e: any) {
			setError({
				status: false,
				message: e.message,
			});
			setIsLoading(false);
			setIsEditing(false);
		}
	};

	const handleChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;
		if (
			districtValue === '' ||
			contactNumberRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'الرجاء قم بملئ جميع الحقول',
			});
		} else if (
			contactNumberRef.current?.value.length !== 10
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'رقم الهاتف يجب أن يتكون من 10 أرقام',
			});
		} else {
			setValidated(true);
			setError({
				status: true,
				message: 'looks good!',
			});
		}
	};

	useEffect(() => {
		const getDistricts = async () => {
			const fetchedDistricts = await fetchDistricts();
			setDistricts(fetchedDistricts);
		};
		getDistricts();
	}, []);

	return (
		<Container sx={{ m: { sm: 5 } }}>
			<main dir='rtl'>
				<Box component='form' noValidate>
					<Button
						variant='outlined'
						color='secondary'
						onClick={() => navigate(-1)}
					>
						<ArrowRightAltIcon />
					</Button>
					<h3 className='text-muted text-center mb-3'>
						أضف عنوانا
					</h3>

					<ErrorComponent error={error} />

					{isEditing ? (
						<Box>
							<FormControl
								sx={{ ml: 3, width: '95.5%' }}
							>
								<InputLabel id='selectCategory'>
									المنطقة
								</InputLabel>
								<Select
									labelId='selectCategory'
									id='category-select'
									value={districtValue}
									onChange={(
										e: SelectChangeEvent,
									) => {
										setDistrictValue(
											e.target
												.value as string,
										);
									}}
									label='اختر المنطقة'
								>
									<MenuItem value=''>
										<em>اختر المنطقة</em>
									</MenuItem>
									{districts?.map(
										(district) => (
											<MenuItem
												value={
													district?._id
												}
												key={
													district?._id
												}
											>
												{district?.name}
											</MenuItem>
										),
									)}
								</Select>
							</FormControl>

							<FormGroup sx={{ m: 3 }}>
								<TextField
									required
									onChange={handleChange}
									type='number'
									label='أدخل رقم للتواصل'
									inputRef={contactNumberRef}
								/>
							</FormGroup>

							<FormGroup sx={{ m: 3 }}>
								<Button
									variant='outlined'
									color='error'
									onClick={() =>
										setIsEditing(false)
									}
								>
									الغاء
								</Button>
							</FormGroup>

							<FormGroup sx={{ m: 3 }}>
								<LoadingButton
									startIcon='حفظ'
									variant='outlined'
									onClick={handleSubmit}
									loading={isLoading}
									disabled={!validated}
								/>
							</FormGroup>
						</Box>
					) : (
						<Box sx={{ m: 3 }}>
							<Typography variant='h4'>
								المنطقة :{' '}
								{contact?.district?.name}
							</Typography>
							<Typography variant='h4'>
								رقم التواصل:{' '}
								{contact?.contactNumber}
							</Typography>
							<Typography
								variant='h4'
								sx={{
									m: 5,
									color: 'warning.main',
									cursor: 'pointer',
								}}
								onClick={() =>
									setIsEditing(true)
								}
							>
								تعديل
							</Typography>
						</Box>
					)}
				</Box>
			</main>
		</Container>
	);
}

export default ContactInfoForm;
