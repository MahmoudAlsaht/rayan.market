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
} from '../app/store/cart';

type CartProps = {
	show: boolean;
	handleClose: () => void;
};

function Cart({ show, handleClose }: CartProps) {
	const cart: TCart = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();

	return (
		<Modal show={show}>
			<Modal.Header>
				<Modal.Title>Cart</Modal.Title>
			</Modal.Header>
			<ModalBody>
				{cart?.products?.map((product) => (
					<div key={product?.id}>
						<h6>{product?.name}</h6>
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
							<span
								className='border p-1'
								onClick={() =>
									dispatch(
										removeProduct(
											product?.id as string,
										),
									)
								}
							>
								remove
							</span>
						</Pagination>

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
