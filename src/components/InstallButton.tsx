import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

const InstallPWA = () => {
	const [supportsPWA, setSupportsPWA] = useState(false);
	const [promptInstall, setPromptInstall] =
		useState<any>(null);

	useEffect(() => {
		const handler = (e: any) => {
			e.preventDefault();
			console.log('we are being triggered :D');
			setSupportsPWA(true);
			setPromptInstall(e);
		};
		window.addEventListener('beforeinstallprompt', handler);

		return () =>
			window.removeEventListener('transitionend', handler);
	}, []);

	const onClick = (e: any) => {
		e.preventDefault();
		if (!promptInstall) {
			return;
		}
		promptInstall.prompt();
	};
	if (!supportsPWA) {
		return null;
	}
	return (
		<Alert variant='dark' dismissible>
			<button
				itemID='installInstructions'
				className='btn btn-outline-primary'
				id='setup_button'
				aria-label='Install app'
				title='Install app'
				onClick={onClick}
			>
				Install
			</button>
		</Alert>
	);
};

export default InstallPWA;
