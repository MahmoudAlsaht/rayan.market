import { Button } from 'react-bootstrap';
import { ReactNode } from 'react';
import '../assets/styles/floatingButton.css';

type FloatingButtonProps = {
	icon: ReactNode;
	handleClickFn: () => void;
};

function FloatingButton({
	icon,
	handleClickFn,
}: FloatingButtonProps) {
	return (
		<>
			<Button
				variant='none'
				className='floatingButton rounded-circle'
				onClick={handleClickFn}
			>
				{icon}
			</Button>
		</>
	);
}

export default FloatingButton;
