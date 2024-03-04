import { ChangeEvent, FormEvent, useRef, useState } from 'react';
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
	FormGroup,
	TextField,
	Typography,
} from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { LoadingButton } from '@mui/lab';

function ContactInfoForm({
	contact,
}: {
	contact: TContactInfo | null;
}) {
	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});
	const { profileId } = useParams();
	const navigate = useNavigate();

	const cityRef = useRef<HTMLInputElement>(null);
	const streetRef = useRef<HTMLInputElement>(null);
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
					city: cityRef.current?.value as string,
					street: streetRef.current?.value as string,
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
				cityRef.current!.value = '';
				streetRef.current!.value = '';
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
			cityRef.current?.value === '' ||
			streetRef.current?.value === '' ||
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

	return (
		<Container sx={{ m: 3 }}>
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
							<FormGroup sx={{ m: 3 }}>
								<TextField
									autoFocus
									onChange={handleChange}
									type='text'
									required
									label='أدخل اسم المنطقة'
									inputRef={cityRef}
								/>
							</FormGroup>

							<FormGroup sx={{ m: 3 }}>
								<TextField
									required
									onChange={handleChange}
									type='text'
									label='اسم الشارع'
									inputRef={streetRef}
								/>
							</FormGroup>

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
									color='info'
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
								{contact?.address?.city}
							</Typography>
							<Typography variant='h4'>
								الشارع:{' '}
								{contact?.address?.street}
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
