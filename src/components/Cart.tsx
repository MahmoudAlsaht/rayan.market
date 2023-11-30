import {
	Button,
	Modal,
	ModalBody,
	Image,
} from 'react-bootstrap';
import { useAppSelector } from '../app/hooks';
import { TCart } from '../app/store/cart';

type CartProps = {
	show: boolean;
	handleClose: () => void;
};

function Cart({ show, handleClose }: CartProps) {
	const cart: TCart = useAppSelector((state) => state.cart);

	return (
		<Modal show={show} fullscreen>
			<Modal.Header>
				<Modal.Title>Cart</Modal.Title>
			</Modal.Header>
			<ModalBody>
				{cart?.products?.map((product) => (
					<div>
						<h6>{product?.name}</h6>
						<Image
							src={product?.imageUrl}
							width={100}
						/>
					</div>
				))}
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
