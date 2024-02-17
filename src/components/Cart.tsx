import { Button, Modal, ModalBody } from 'react-bootstrap';
import { useAppSelector } from '../app/hooks';
import { TCart, TCartProduct } from '../app/store/cart';
import '../assets/styles/CartStyle.css';
import { useNavigate } from 'react-router-dom';
import CartProductCard from './CartProductCard';
import { useEffect, useState } from 'react';
import { checkEveryProductCounter } from '../controllers/cart';

type CartProps = {
	show: boolean;
	handleClose: () => void;
};

function Cart({ show, handleClose }: CartProps) {
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
		<Modal show={show} fullscreen>
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
				<div className='totalPrice text-muted me-5'>
					المجموع الكلي: {cart?.totalPrice} د.أ
				</div>
			</ModalBody>
			<Modal.Footer className='arb-text'>
				<Button
					onClick={handleCheckout}
					disabled={
						!checkIfCartIsEmpty ||
						!isCountersAboveZero
					}
				>
					الدفع
				</Button>
				<Button
					onClick={handleClose}
					variant='outline-secondary'
				>
					الغاء
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default Cart;
