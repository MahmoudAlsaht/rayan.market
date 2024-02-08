import { Button, Modal, ModalBody } from 'react-bootstrap';
import { useAppSelector } from '../app/hooks';
import { TCart } from '../app/store/cart';
import '../assets/styles/CartStyle.css';
import { useNavigate } from 'react-router-dom';
import CartProductCard from './CartProductCard';

type CartProps = {
	show: boolean;
	handleClose: () => void;
};

function Cart({ show, handleClose }: CartProps) {
	const cart: TCart = useAppSelector((state) => state.cart);
	const navigate = useNavigate();

	const checkIfCartIsEmpty = cart.products!.length! > 0;

	const handleCheckout = () => {
		navigate('/cart');
		handleClose();
	};

	return (
		<Modal show={show}>
			<Modal.Header>
				<Modal.Title>Cart</Modal.Title>
			</Modal.Header>
			<ModalBody>
				{cart?.products?.map((product) => (
					<CartProductCard
						key={product?._id}
						product={product}
					/>
				))}
				<div className='totalPrice text-muted'>
					Total: {cart?.totalPrice} JOD
				</div>
			</ModalBody>
			<Modal.Footer>
				<Button
					onClick={handleClose}
					variant='outline-secondary'
				>
					Close
				</Button>

				<Button
					onClick={handleCheckout}
					disabled={!checkIfCartIsEmpty}
				>
					Checkout
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default Cart;
