import { Button, Modal, ModalBody } from 'react-bootstrap';
import { useAppSelector } from '../app/hooks';
import { TCart, TCartProduct } from '../app/store/cart';
import '../assets/styles/CartStyle.css';
import { useState, useEffect } from 'react';
import { sumTotalPrice } from '../utils';
import { useNavigate } from 'react-router-dom';
import CartProductCard from './CartProductCard';

type CartProps = {
	show: boolean;
	handleClose: () => void;
};

function Cart({ show, handleClose }: CartProps) {
	const cart: TCart = useAppSelector((state) => state.cart);
	const [totalCartPrice, setTotalCartPrice] = useState(0);
	const navigate = useNavigate();

	const handleCheckout = () => {
		navigate('/cart');
		handleClose();
	};

	useEffect(() => {
		setTotalCartPrice(
			sumTotalPrice(cart?.products as TCartProduct[]),
		);
	}, [cart?.products]);

	return (
		<Modal show={show}>
			<Modal.Header>
				<Modal.Title>Cart</Modal.Title>
			</Modal.Header>
			<ModalBody>
				{cart?.products?.map((product) => (
					<CartProductCard
						key={product?.id}
						product={product}
					/>
				))}
				<div className='totalPrice text-muted'>
					Total: {totalCartPrice} JOD
				</div>
			</ModalBody>
			<Modal.Footer>
				<Button
					onClick={handleClose}
					variant='outline-secondary'
				>
					Close
				</Button>

				<Button onClick={handleCheckout}>
					Checkout
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default Cart;
