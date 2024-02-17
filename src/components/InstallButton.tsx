import { useEffect, useState } from 'react';
import { Alert, Button, Navbar } from 'react-bootstrap';
import { BsDownload } from 'react-icons/bs';

const InstallPWA = () => {
	const [supportsPWA, setSupportsPWA] = useState(false);
	const [promptInstall, setPromptInstall] =
		useState<any>(null);

	const [isInstalled, setIsInstalled] = useState(
		localStorage.getItem('pwaInstalled') === '1' || false,
	);

	useEffect(() => {
		const installHandler = (e: any) => {
			e.preventDefault();
			localStorage.setItem('pwaInstalled', '0');
			setIsInstalled(false);

			setSupportsPWA(true);
			setPromptInstall(e);
		};

		const afterInstalledHandler = () => {
			localStorage.setItem('pwaInstalled', '1');
			setIsInstalled(true);
		};

		if (
			window.matchMedia('(display-mode: standalone)')
				.matches ||
			document.referrer.startsWith('android-app://')
		) {
			localStorage.setItem('pwaInstalled', '1');
			setIsInstalled(true);
		} else {
			window.addEventListener(
				'beforeinstallprompt',
				installHandler,
			);
			window.addEventListener(
				'onappinstalled',
				afterInstalledHandler,
			);

			return () =>
				window.removeEventListener(
					'transitionend',
					installHandler,
				);
		}
	}, []);

	const onClick = (e: any) => {
		e.preventDefault();
		setIsInstalled(true);

		if (!promptInstall) {
			return;
		}
		promptInstall.prompt();
	};
	if (!supportsPWA || isInstalled) return null;

	return (
		<Alert
			dismissible
			variant='success'
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
					Install <BsDownload />
				</Button>
			</Navbar>
		</Alert>
	);
};

export default InstallPWA;
