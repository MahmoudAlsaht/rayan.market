import { Badge, Button } from 'react-bootstrap';
import { ReactNode } from 'react';
import '../assets/styles/floatingButton.css';

type CartFloatingButtonProps = {
	icon: ReactNode;
	handleClickFn: () => void;
	cartLength: number | undefined;
};

function CartFloatingButton({
	icon,
	handleClickFn,
	cartLength,
}: CartFloatingButtonProps) {
	return (
		<>
			<Button
				variant='none'
				className='floatingButton rounded'
				onClick={handleClickFn}
			>
				{icon}
				<small>
					<Badge pill bg='danger'>
						{cartLength}
					</Badge>
				</small>
			</Button>
		</>
	);
}

export default CartFloatingButton;
