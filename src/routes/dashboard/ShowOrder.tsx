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
import { useAppDispatch } from '../../app/hooks';

function ShowOrder() {
	const { orderId } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

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
						orderId: order?.id as string,
						updatedStatus: 'accepted',
					}),
				);
			} else if (order?.status === 'accepted') {
				dispatch(
					updateOrderStatus({
						orderId: order?.id as string,
						updatedStatus: 'completed',
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
					orderId: order?.id as string,
					updatedStatus: 'rejected',
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
		const getOrder = async () => {
			const fetchedOrder = await fetchOrder(
				orderId as string,
			);
			setOrder(fetchedOrder);
		};

		getOrder();
	}, [orderId]);

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
								key={product?.id}
								style={{ cursor: 'pointer' }}
								onClick={() =>
									openProductPage(
										product?.id as string,
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
							{order?.username}{' '}
						</h6>
						<h6>
							<span className='text-muted'>
								Email:
							</span>{' '}
							{order?.email}
						</h6>
						<h6>
							<span className='text-muted'>
								Address:
							</span>{' '}
							{order?.address}
						</h6>
						<h6>
							<span className='text-muted'>
								PhoneNumber:
							</span>{' '}
							{order?.phoneNumber}
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
						) : order?.status === 'completed' ? (
							<Button variant='secondary' disabled>
								This order has been completed,
								There are no actions available
							</Button>
						) : (
							<Button variant='secondary' disabled>
								This order has been rejected,
								There are no actions available
							</Button>
						)}
					</Card.Footer>
				</Card>
			</Container>
		</>
	);
}

export default ShowOrder;
