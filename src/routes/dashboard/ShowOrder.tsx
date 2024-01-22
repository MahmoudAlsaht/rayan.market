import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOrder } from '../../controllers/order';
import { TOrder } from '../../app/store/order';
import { Button, Card, Container } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';

function ShowOrder() {
	const { orderId } = useParams();
	const navigate = useNavigate();

	const [order, setOrder] = useState<TOrder | null>(null);

	const openProductPage = (productId: string) => {
		window.open(
			`${
				import.meta.env.VITE_PRODUCT_REDIRECT_URL
			}${productId}`,
			'_blank',
		);
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
									order?.status === 'completed'
										? 'text-success'
										: 'text-warning'
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
					</Card.Body>
					<Card.Footer>
						{order?.status === 'pending' && (
							<Button
								variant='danger'
								className='me-2'
							>
								Reject
							</Button>
						)}
						{order?.status !== 'completed' ? (
							<Button>
								{order?.status === 'pending'
									? 'Accept'
									: 'Complete Order'}
							</Button>
						) : (
							<Button variant='secondary' disabled>
								This order has been completed,
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
