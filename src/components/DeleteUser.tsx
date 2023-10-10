import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import ErrorComponent, { IError } from './Error';
import { Button, Form, Modal } from 'react-bootstrap';
import { destroyUser } from '../controllers/profile';
import { useNavigate } from 'react-router-dom';

function DeleteUser({ profileId }: { profileId: string }) {
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
			const form = e.currentTarget as HTMLFormElement;
			if (form.checkValidity() === false) {
				setError({
					status: true,
					message: 'invalid fields',
				});
			} else {
				await destroyUser(
					setError,
					passwordRef.current?.value as string,
					profileId,
				);
				handleClose();
				navigate('/');
			}
		} catch (e: any) {
			console.log(e.message);
			setError({
				status: true,
				message:
					'Something went wrong, please try again',
			});
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

			<ErrorComponent error={error} />

			<Button
				variant='outline-danger'
				onClick={handleShow}
			>
				Delete User
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Form
					noValidate
					validated={!validated}
					onSubmit={handleRemoveUser}
					style={{ width: '100%' }}
				>
					<Modal.Body className='text-danger'>
						Type Your Password To Confirm Deletion
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
						<Form.Control
							disabled={!validated}
							type='submit'
							className={`btn w-50 ${
								!validated
									? 'btn-secondary'
									: 'btn-outline-danger'
							}`}
							value='Delete Account'
						/>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
}

export default DeleteUser;
