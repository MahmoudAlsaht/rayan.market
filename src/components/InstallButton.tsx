import { useEffect, useState } from 'react';
import { Alert, Button, Navbar } from 'react-bootstrap';

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
		<Alert
			dismissible
			variant='warning'
			itemID='installInstructions'
			className='mb-0'
		>
			<Navbar className='justify-content-start bg-none'>
				<Button
					variant='outline-success'
					aria-label='Install app'
					title='Install app'
					onClick={onClick}
				>
					Install
				</Button>
			</Navbar>
		</Alert>
	);
};

export default InstallPWA;
