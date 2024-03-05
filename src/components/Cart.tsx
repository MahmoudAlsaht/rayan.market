import {
	AppBar,
	Button,
	Dialog,
	DialogActions,
	IconButton,
	List,
	Slide,
	Toolbar,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import {
	ReactElement,
	Ref,
	forwardRef,
	useEffect,
	useState,
} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { TCart, TCartProduct } from '../app/store/cart';
import { checkEveryProductCounter } from '../controllers/cart';
import { useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import CartProductCard from './CartProductCard';

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: ReactElement;
	},
	ref: Ref<unknown>,
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

type CartProps = {
	show: boolean;
	handleClose: () => void;
};

export default function Cart({ show, handleClose }: CartProps) {
	const cart: TCart = useAppSelector((state) => state.cart);
	const navigate = useNavigate();

	const checkIfCartIsEmpty = cart.products!.length! > 0;
	const [isCountersAboveZero, setIsCountersAboveZero] =
		useState(true);

	const handleCheckout = () => {
		navigate('/cart');
		handleClose();
	};

	useEffect(() => {
		setIsCountersAboveZero(
			checkEveryProductCounter(
				cart?.products as TCartProduct[],
			),
		);
	}, [cart?.products]);

	return (
		<Dialog
			fullScreen
			open={show}
			onClose={handleClose}
			TransitionComponent={Transition}
		>
			<main dir='rtl'>
				<AppBar
					sx={{
						position: 'relative',
						bgcolor: '#fff',
					}}
				>
					<Toolbar>
						<IconButton
							edge='start'
							sx={{ color: 'black' }}
							onClick={handleClose}
							aria-label='close'
						>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
			</main>
			<List>
				{cart?.products?.map((product) => (
					<CartProductCard
						key={product?._id}
						product={product}
					/>
				))}
				{cart?.totalPrice > 0 && (
					<legend
						dir='rtl'
						// style={{ margin: '0 -3rem' }}
					>
						المجموع الكلي:{' '}
						{cart?.totalPrice?.toFixed(2)} د.أ
					</legend>
				)}
			</List>
			{cart?.products && cart.products.length > 0 && (
				<DialogActions sx={{ mx: 5 }}>
					<legend dir='rtl'>
						<Button
							onClick={handleCheckout}
							disabled={
								!checkIfCartIsEmpty ||
								!isCountersAboveZero
							}
							variant='outlined'
							sx={{ mr: 2 }}
						>
							الدفع
						</Button>
						<Button
							variant='outlined'
							onClick={handleClose}
						>
							الغاء
						</Button>
					</legend>
				</DialogActions>
			)}
		</Dialog>
	);
}
