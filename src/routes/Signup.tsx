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
import { fetchUser } from '../controllers/user';
import { TUser } from '../app/auth/auth';
import ErrorComponent, { IError } from '../components/Error';
import LoadingButton from '../components/LoadingButton';

function Signup() {
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});
	const [isLoading, setIsLoading] = useState(false);

	const emailRef = useRef<HTMLInputElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement | null>(
		null,
	);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	if (user?.username !== 'anonymous') navigate(-1);

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
				await signUp(
					emailRef.current?.value,
					passwordRef.current?.value,
					usernameRef.current!.value,
				);
				navigate(-1);
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
				message: 'الرحاء إدخال جميع الحقول المطلوبة',
			});
		} else if (
			passwordRef.current?.value !==
			confirmPasswordRef.current?.value
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'كلمتي المرور غير متطابقتين',
			});
		} else if (passwordRef.current!.value.length < 6) {
			setValidated(false);
			setError({
				status: false,
				message: 'كلمة المرور يجب أن لا تقل عن 6 خانات',
			});
		} else if (usernameRef.current?.value === 'anonymous') {
			setValidated(false);
			setError({
				status: false,
				message: ' يمكنك اختيار لمة المرور هذه!',
			});
		} else {
			setValidated(true);
			setError({
				status: true,
				message: 'ممتاز!',
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
						style={{
							width: '100%',
							height: '70dvh',
						}}
					>
						<ErrorComponent error={error} />

						<Form.Group
							className='mb-3'
							controlId='emailInput'
						>
							<Form.Label className='arb-text'>
								البريد الإلكتروني
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
							<Form.Label className='arb-text'>
								إسم المستخدم{' '}
							</Form.Label>
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
							<Form.Label className='arb-text'>
								كلمة المرور{' '}
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
							controlId='passwordConfirmationInput'
						>
							<Form.Label className='arb-text'>
								تأكيد كلمة المرور{' '}
							</Form.Label>
							<Form.Control
								onChange={handleChange}
								required
								type='password'
								placeholder='at least 6 char'
								ref={confirmPasswordRef}
							/>
						</Form.Group>
						<Form.Group className='mb-3 arb-text'>
							<small className='text-info m-3'>
								لديك حساب بالفعل؟{' '}
								<Link
									to='/auth/signin'
									className='text-primary'
									style={{
										textDecoration:
											'underline',
									}}
								>
									سجل الدخول
								</Link>
							</small>
							<LoadingButton
								type='submit'
								body='Register'
								variant='primary'
								disabled={!validated}
								isLoading={isLoading}
							/>
						</Form.Group>
					</Form>
				</Container>
			</Col>
		</Row>
	);
}

export default Signup;
