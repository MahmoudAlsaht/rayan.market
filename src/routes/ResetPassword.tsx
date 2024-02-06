import { Col, Container, Form, Row } from 'react-bootstrap';
import ErrorComponent, { IError } from '../components/Error';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { resetPassword } from '../controllers/user';

function ResetPassword() {
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState<IError>({
		status: null,
		message: '',
	});

	const emailRef = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();

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
				// resetPassword(emailRef.current?.value as string);
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
			form.checkValidity() === false
		) {
			setValidated(false);
			setError({
				status: false,
				message: 'please provide your email address',
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
		<>
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

							<Form.Group className='mb-3'>
								<Form.Control
									disabled={!validated}
									type='submit'
									value='Reset Password'
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
		</>
	);
}

export default ResetPassword;
