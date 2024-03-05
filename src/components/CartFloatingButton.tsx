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
					bottom: { xs: 60, md: 5 },
					left: { xs: 0, md: 250 },
					width: { xs: '100%', md: '60%' },
					height: { xs: '40px', md: '60px' },
					backgroundColor: {
						xs: 'primary.main',
						md: 'primary.light',
					},
				}}
			>
				<Badge badgeContent={cartLength} color='error'>
					<ShoppingBasketIcon
						sx={{
							mr: 1,
							fontSize: { xs: 18, md: 25 },
							color: {
								xs: 'white',
								md: 'black',
							},
						}}
					/>
				</Badge>
			</Fab>
		</>
	);
}

export default CartFloatingButton;
