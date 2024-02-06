import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import ErrorComponent, { IError } from '../Error';
import { Button, Form, Modal } from 'react-bootstrap';
import { destroyUser } from '../../controllers/profile';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '../LoadingButton';
import { useAppDispatch } from '../../app/hooks';

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
					message: 'invalid fields',
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
				message: 'please provide all the missing fields',
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
			<h3 className='text-muted mb-3'>Account Deletion</h3>

			<Button
				variant={
					!isLoading ? 'outline-danger' : 'secondary'
				}
				onClick={handleShow}
				disabled={isLoading}
			>
				Delete User
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title className='text-danger'>
						Delete Account?
					</Modal.Title>
				</Modal.Header>

				<Form
					noValidate
					validated={!validated}
					onSubmit={handleRemoveUser}
					style={{ width: '100%' }}
				>
					<Modal.Body>
						<ErrorComponent error={error} />
						<Form.Group
							className='mt-3 mb-3'
							controlId='passwordUserInfoFormInput'
						>
							<Form.Control
								required
								onChange={handleChange}
								type='password'
								placeholder='at least 6 char'
								ref={passwordRef}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant='secondary'
							onClick={handleClose}
						>
							Close
						</Button>
						<LoadingButton
							type='submit'
							body='Delete Account'
							variant='danger'
							className={'w-50'}
							isLoading={isLoading}
							disabled={!validated}
						/>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
}

export default DeleteUser;
