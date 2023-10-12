import {
	useRef,
	FormEvent,
	useEffect,
	useState,
	ChangeEvent,
} from 'react';
import { signUp } from '../controllers/user';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { IUser, fetchUser } from '../controllers/user';
import ErrorComponent, { IError } from '../components/Error';

function Signup() {
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});

	const emailRef = useRef<HTMLInputElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement | null>(
		null,
	);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user: IUser | any = useAppSelector(
		(state) => state.user,
	);

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	if (user != null) navigate(-1);

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
				await signUp(
					emailRef.current?.value,
					passwordRef.current?.value,
					usernameRef.current!.value,
				);
				navigate('/');
			}
		} catch (e: any) {
			setError({
				status: false,
				message: e.message,
			});
		}
	};

	const handleChange = (e: ChangeEvent) => {
		const form = e.currentTarget as HTMLFormElement;
		if (
			emailRef.current?.value === '' ||
			passwordRef.current?.value === '' ||
			usernameRef.current?.value === '' ||
			confirmPasswordRef.current?.value === '' ||
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'please provide all the missing fields',
			});
		} else if (
			passwordRef.current?.value !==
			confirmPasswordRef.current?.value
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'passwords do not match',
			});
		} else if (passwordRef.current!.value.length < 6) {
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

	return (
		<Row className='d-flex justify-content-center'>
			<Col xs={10} sm={8} md={6} lg={5} xl={4}>
				<Container className='bg-white mt-5 p-5 border rounded shadow'>
					<Form
						noValidate
						validated={!validated}
						onSubmit={handleSubmit}
						style={{ width: '100%' }}
					>
						<ErrorComponent error={error} />

						<Form.Group
							className='mb-3'
							controlId='emailInput'
						>
							<Form.Label>
								Email address
							</Form.Label>
							<Form.Control
								onChange={handleChange}
								required
								type='email'
								placeholder='name@example.com'
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
								required
								type='text'
								placeholder='your name'
								ref={usernameRef}
							/>
						</Form.Group>
						<Form.Group
							className='mb-3'
							controlId='passwordInput'
						>
							<Form.Label>Password</Form.Label>
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
							controlId='passwordConfirmationInput'
						>
							<Form.Label>
								Confirm Password
							</Form.Label>
							<Form.Control
								onChange={handleChange}
								required
								type='password'
								placeholder='at least 6 char'
								ref={confirmPasswordRef}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<small className='text-info m-3'>
								Already have an account?{' '}
								<Link
									to='/auth/signin'
									className='text-primary'
									style={{
										textDecoration:
											'underline',
									}}
								>
									SIGNIN
								</Link>
							</small>
							<Form.Control
								disabled={!validated}
								type='submit'
								value='Signup'
								className={`btn ${
									!validated
										? 'btn-secondary'
										: 'btn-outline-primary'
								}`}
							/>
						</Form.Group>
					</Form>
				</Container>
			</Col>
		</Row>
	);
}

export default Signup;
