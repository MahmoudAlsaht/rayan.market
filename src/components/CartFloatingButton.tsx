import Badge from '@mui/material/Badge';
import { Fab } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

type CartFloatingButtonProps = {
	handleClickFn: () => void;
	cartLength: number | undefined;
};

function CartFloatingButton({
	handleClickFn,
	cartLength,
}: CartFloatingButtonProps) {
	return (
		<>
			<Fab
				variant='extended'
				onClick={handleClickFn}
				sx={{
					position: 'fixed',
					bottom: 5,
					left: 250,
					width: '60%',
					height: '60px',
					backgroundColor: 'primary.light',
				}}
			>
				<Badge badgeContent={cartLength} color='error'>
					<ShoppingBasketIcon sx={{ mr: 1 }} />
				</Badge>
			</Fab>
		</>
	);
}

export default CartFloatingButton;
