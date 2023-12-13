import {
	Button,
	Modal,
	ModalBody,
	Image,
	Pagination,
} from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
	removeFromCounter,
	TCart,
	addToCounter,
	removeProduct,
	TCartProduct,
} from '../app/store/cart';
import { BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../assets/styles/CartStyle.css';
import { useState, useEffect } from 'react';
import { sumTotalPrice } from '../utils';

type CartProps = {
	show: boolean;
	handleClose: () => void;
};

function Cart({ show, handleClose }: CartProps) {
	const cart: TCart = useAppSelector((state) => state.cart);
	const [totalCartPrice, setTotalCartPrice] = useState(0);
	const dispatch = useAppDispatch();

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
					<div
						key={product?.id}
						className='cartContainer mb-5'
					>
						<Image
							src={product?.imageUrl}
							className='imageProduct'
						/>

						<div className='productInfo'>
							<h6>
								{product?.name?.substring(0, 52)}
							</h6>
							<h6>{product?.price} JOD</h6>
							<h6>
								{product?.quantity}{' '}
								<span className='text-muted'>
									In stock
								</span>
							</h6>
							<Pagination>
								<Pagination.Item
									onClick={() =>
										dispatch(
											removeFromCounter(
												product?.id as string,
											),
										)
									}
								>
									-
								</Pagination.Item>
								<Pagination.Item>
									{product?.counter}
								</Pagination.Item>
								<Pagination.Item
									onClick={() =>
										dispatch(
											addToCounter({
												id: product?.id as string,
												maxNum: parseInt(
													product?.price as string,
												),
											}),
										)
									}
								>
									+
								</Pagination.Item>
								<Link
									to='#'
									className='border p-1'
									onClick={() =>
										dispatch(
											removeProduct(
												product?.id as string,
											),
										)
									}
								>
									<BsTrash className='text-danger' />
								</Link>
							</Pagination>
						</div>
					</div>
				))}
				<div className='totalPrice text-muted'>
					Total Price: {totalCartPrice}
				</div>
			</ModalBody>
			<Modal.Footer>
				<Button
					onClick={handleClose}
					variant='outline-secondary'
				>
					Close
				</Button>

				<Button>Checkout</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default Cart;
