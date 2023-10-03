import {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	editProfile,
	fetchProfile,
} from '../../controllers/profile';
// import { IProfile } from '../../app/auth/profile';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IUser, fetchUser } from '../../controllers/user';
import {
	Form,
	Alert,
	Col,
	Container,
	Row,
	Image,
} from 'react-bootstrap';
import defaultAvatar from '../../default_avatar.png';
import { uploadImage } from '../../firebase/firestore/uplaodFile';

function EditUser() {
	const profileOwner: IUser | any = useAppSelector(
		(state) => state.user,
	);

	const { profileId } = useParams();
	const dispatch = useAppDispatch();
	const [selectedImage, setSelectedImage] =
		useState<File | null>(null);
	const [reviewImage, setReviewImage] = useState(
		profileOwner?.photoURL,
	);
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState({
		status: false,
		message: 'please provide all the fields below',
	});

	const emailRef = useRef<HTMLInputElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const newPasswordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement | null>(
		null,
	);

	const navigate = useNavigate();

	if (profileOwner == null) navigate('/');

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const form = e.currentTarget as HTMLFormElement;

			if (form.checkValidity() === false) {
				setError({
					status: true,
					message: 'invalid fields',
				});
			} else {
				const data = {
					email: emailRef.current?.value,
					username: usernameRef.current?.value,
					currentPassword: passwordRef.current?.value,
					newPassword: newPasswordRef.current?.value,
				};
				await editProfile(data, profileOwner?.docId);
				// navigate('/');
			}
		} catch (e: any) {
			console.log(e.message);
		}
	};

	const handleFileChange = (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		if (!e.target.files) return;
		const files: FileList | null = e.target.files;
		setSelectedImage(files[0]);
		setReviewImage(URL.createObjectURL(files[0]));
	};

	const handleFileSubmit = async (e: FormEvent) => {
		e.preventDefault();
		await uploadImage(
			selectedImage,
			profileOwner?.username,
			profileOwner?.uid,
		);
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
				message: 'please provide all the missing fields',
			});
		} else if (
			newPasswordRef.current!.value.length > 0 &&
			newPasswordRef.current?.value !==
				confirmPasswordRef.current?.value
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'passwords do not match',
			});
		} else if (
			newPasswordRef.current!.value.length > 0 &&
			newPasswordRef.current!.value.length < 6
		) {
			setValidated(false);
			setError({
				status: false,
				message:
					'password must be at least 6 characters',
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
		dispatch(fetchProfile(profileId as string));
		dispatch(fetchUser());
	}, [dispatch, profileId]);

	return (
		<Row className='d-flex justify-content-center'>
			<Col xs={12} sm={8} md={6} lg={5} xl={4}>
				<Container className='bg-white mt-5 p-5 border rounded shadow'>
					<Form onSubmit={handleFileSubmit}>
						<Row>
							<Col>
								<Image
									src={
										profileOwner?.photoURL ||
										defaultAvatar
									}
									width={100}
									height={100}
									alt='profileImage'
								/>
							</Col>
							<Col>{`<== ==>`}</Col>
							<Col>
								{reviewImage && (
									<Image
										src={reviewImage}
										width={100}
										height={100}
										alt='profileImage'
									/>
								)}
							</Col>
						</Row>

						<Form.Group
							controlId='profileImage'
							className='mb-3'
						>
							<Form.Label>
								Upload Profile Image
							</Form.Label>
							<Form.Control
								type='file'
								onChange={handleFileChange}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Control
								type='submit'
								value='Update'
								className='btn btn-outline-primary'
							/>
						</Form.Group>
					</Form>
					<Form
						noValidate
						validated={!validated}
						onSubmit={handleSubmit}
						style={{ width: '100%' }}
					>
						{error.status === false ? (
							<Alert key='danger' variant='danger'>
								{error.message}
							</Alert>
						) : (
							<Alert
								key='success'
								variant='success'
							>
								{error.message}
							</Alert>
						)}
						<Form.Group
							className='mb-3'
							controlId='emailInput'
						>
							<Form.Label>
								Email address
							</Form.Label>
							<Form.Control
								onChange={handleChange}
								type='email'
								placeholder='name@example.com'
								defaultValue={
									profileOwner?.email
								}
								ref={emailRef}
							/>
						</Form.Group>

						<Form.Group
							className='mb-3'
							controlId='NameInput'
						>
							<Form.Label>Name</Form.Label>
							<Form.Control
								onChange={handleChange}
								type='text'
								placeholder='your name'
								defaultValue={
									profileOwner?.username
								}
								ref={usernameRef}
							/>
						</Form.Group>
						<Form.Group
							className='mb-3'
							controlId='CurrentPasswordInput'
						>
							<Form.Label>
								Current Password
							</Form.Label>
							<Form.Control
								onChange={handleChange}
								required
								type='password'
								placeholder='at least 6 char'
								ref={passwordRef}
							/>
						</Form.Group>
						<Form.Group
							className='mb-3'
							controlId='NewPasswordInput'
						>
							<Form.Label>New Password</Form.Label>
							<Form.Control
								onChange={handleChange}
								type='password'
								placeholder='at least 6 char'
								ref={newPasswordRef}
							/>
						</Form.Group>
						<Form.Group
							className='mb-3'
							controlId='passwordConfirmationInput'
						>
							<Form.Label>
								Confirm Password
							</Form.Label>
							<Form.Control
								onChange={handleChange}
								type='password'
								placeholder='at least 6 char'
								ref={confirmPasswordRef}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Control
								disabled={!validated}
								type='submit'
								value='Update'
								className={`btn ${
									!validated
										? 'btn-secondary'
										: 'btn-outline-warning'
								}`}
							/>
						</Form.Group>
					</Form>
				</Container>
			</Col>
		</Row>
	);
}

export default EditUser;
