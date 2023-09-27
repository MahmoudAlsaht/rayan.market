import { useRef, FormEvent } from 'react';
import { signUp } from '../controllers/user';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Signup() {
	const emailRef = useRef<HTMLInputElement>(null);
	const displayNameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		console.log(emailRef.current?.value);
		console.log(passwordRef.current?.value);
		console.log(displayNameRef.current?.value);

		try {
			await signUp(
				emailRef.current?.value,
				passwordRef.current?.value,
				displayNameRef.current!.value,
			);
			navigate('/');
		} catch (e: any) {
			console.log(e.message);
		}
	};

	return (
		<Row className='d-flex justify-content-center'>
			<Col xs={10} sm={8} md={6} lg={5} xl={4}>
				<Container className='bg-white mt-5 p-5 border rounded shadow'>
					<Form
						onSubmit={handleSubmit}
						style={{ width: '100%' }}
					>
						<Form.Group
							className='mb-3'
							controlId='emailInput'
						>
							<Form.Label>
								Email address
							</Form.Label>
							<Form.Control
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
								type='text'
								placeholder='your name'
								ref={displayNameRef}
							/>
						</Form.Group>
						<Form.Group
							className='mb-3'
							controlId='passwordInput'
						>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='at least 6 char'
								ref={passwordRef}
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
								type='submit'
								value='Signup'
								className='btn btn-outline-primary'
							/>
						</Form.Group>
					</Form>
				</Container>
			</Col>
		</Row>
	);
}

export default Signup;
