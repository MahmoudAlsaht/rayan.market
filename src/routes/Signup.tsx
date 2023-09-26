import { useRef, FormEvent } from 'react';
import { signUp } from '../controllers/user';
import { useNavigate } from 'react-router-dom';

function Signup() {
	const emailRef = useRef<any>(null);
	const passwordRef = useRef<any>(null);
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			await signUp(
				emailRef.current.value,
				passwordRef.current.value,
			);
			navigate('/');
		} catch (e: any) {
			console.log(e.message);
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				style={{ margin: '10rem 10rem' }}
			>
				<div>
					<input type='email' ref={emailRef} />
				</div>
				<div>
					<input type='password' ref={passwordRef} />
				</div>
				<div>
					<input type='submit' value='Register' />
				</div>
			</form>
		</>
	);
}

export default Signup;
