/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	fetchOrder,
	updateOrderStatus,
} from '../../controllers/order';
import { TOrder } from '../../app/store/order';
import { Button, Card, Container } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TUser } from '../../app/auth/auth';
import { fetchUser } from '../../controllers/user';

function ShowOrder() {
	const { orderId } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user: TUser | null = useAppSelector(
		(state) => state.user,
	);

	const [order, setOrder] = useState<TOrder | null>(null);

	const openProductPage = (productId: string) => {
		window.open(
			`${
				import.meta.env.VITE_PRODUCT_REDIRECT_URL
			}${productId}`,
			'_blank',
		);
	};

	const handleClick = async () => {
		try {
			if (order?.status === 'pending') {
				dispatch(
					updateOrderStatus({
						orderId: order?._id as string,
						updatedStatus: 'accepted',
						userId: user?._id as string,
					}),
				);
			} else if (order?.status === 'accepted') {
				dispatch(
					updateOrderStatus({
						orderId: order?._id as string,
						updatedStatus: 'completed',
						userId: user?._id as string,
					}),
				);
			}
			const updatedOrder = await fetchOrder(
				orderId as string,
			);
			setOrder(updatedOrder);
		} catch (e) {
			console.error(e);
		}
	};

	const handleReject = async () => {
		try {
			dispatch(
				updateOrderStatus({
					orderId: order?._id as string,
					updatedStatus: 'rejected',
					userId: user?._id as string,
				}),
			);
			const updatedOrder = await fetchOrder(
				orderId as string,
			);
			setOrder(updatedOrder);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		dispatch(fetchUser());
		const getOrder = async () => {
			const fetchedOrder = await fetchOrder(
				orderId as string,
			);
			setOrder(fetchedOrder);
		};

		getOrder();
	}, [dispatch, orderId]);

	return (
		<>
			<Container className='mt-5'>
				<Button
					variant='outline-secondary'
					onClick={() => navigate(-1)}
				>
					<BsArrowLeft /> Go Back
				</Button>
			</Container>
			<Container className='mt-5 d-flex flex-column align-items-center'>
				<Card className='w-50'>
					<Card.Header>
						<Card.Title>
							Order-Id: {order?.orderId}
						</Card.Title>
						<Card.Subtitle>
							Total Order Price:{' '}
							{order?.totalPrice}
						</Card.Subtitle>
						<Card.Subtitle className='mt-2 text-muted'>
							Order Status:{' '}
							<span
								className={
									order?.status === 'pending'
										? 'text-primary'
										: order?.status ===
										  'accepted'
										? 'text-warning'
										: order?.status ===
										  'completed'
										? 'text-success'
										: 'text-danger'
								}
							>
								{order?.status}
							</span>
						</Card.Subtitle>
					</Card.Header>
					<Card.Body>
						<h3>Cart Items: </h3>
						{order?.products?.map((product) => (
							<p
								className='text-info'
								key={product?._id}
								style={{ cursor: 'pointer' }}
								onClick={() =>
									openProductPage(
										product?._id as string,
									)
								}
							>
								{product?.name?.substring(0, 50)}{' '}
								<small className='text-dark'>
									X {product?.counter}
								</small>
							</p>
						))}
						<hr />
						<h3>Customer Information:</h3>
						<h6>
							<span className='text-muted'>
								Username:
							</span>{' '}
							{order?.user?.username}{' '}
						</h6>
						<h6>
							<span className='text-muted'>
								Email:
							</span>{' '}
							{order?.user?.email}
						</h6>
						<h6>
							<span className='text-muted'>
								Address:
							</span>{' '}
							{order?.contact.address.street},{' '}
							{order?.contact.address.city}
						</h6>
						<h6>
							<span className='text-muted'>
								PhoneNumber:
							</span>{' '}
							{order?.contact.contactNumber}
						</h6>
					</Card.Body>
					<Card.Footer>
						{order?.status === 'pending' ? (
							<div>
								<Button
									variant='danger'
									className='me-2'
									onClick={handleReject}
								>
									Reject
								</Button>
								<Button
									variant='primary'
									className='me-2'
									onClick={handleClick}
								>
									Accept
								</Button>
							</div>
						) : order?.status === 'accepted' ? (
							<Button onClick={handleClick}>
								Complete Order
							</Button>
						) : (
							<Button variant='secondary' disabled>
								This order has been{' '}
								{order?.status}, There are no
								actions to be performed.
							</Button>
						)}
					</Card.Footer>
				</Card>
			</Container>
		</>
	);
}

export default ShowOrder;
