import { SyntheticEvent, useEffect, useState } from 'react';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import { Button, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const InstallPWA = () => {
	const [supportsPWA, setSupportsPWA] = useState(false);
	const [promptInstall, setPromptInstall] =
		useState<any>(null);

	const handleClose = (
		event: SyntheticEvent | Event,
		reason?: string,
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const [isInstalled, setIsInstalled] = useState(
		localStorage.getItem('pwaInstalled') === '1' || false,
	);

	const [open, setOpen] = useState(!isInstalled);

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
		<main dir='rtl'>
			<Snackbar
				open={open}
				onClose={handleClose}
				message={
					<Button
						variant='outlined'
						aria-label='Install app'
						title='Install app'
						onClick={onClick}
					>
						Install <InstallMobileIcon />
					</Button>
				}
				action={
					<IconButton
						size='small'
						aria-label='close'
						color='inherit'
						onClick={handleClose}
					>
						<CloseIcon fontSize='small' />
					</IconButton>
				}
			/>
		</main>
	);
};

export default InstallPWA;
