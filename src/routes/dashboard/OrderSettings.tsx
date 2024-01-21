/* eslint-disable no-mixed-spaces-and-tabs */
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchOrders } from '../../controllers/order';
import { TOrder } from '../../app/store/order';
import { Badge, Container, Nav } from 'react-bootstrap';
import Widget from '../../components/dashboardComponents/Widget';
import { escapeRegExp } from '../../utils';

function OrderSettings() {
	const orders: TOrder[] = useAppSelector(
		(state) => state.orders,
	);
	const [queryInput, setQueryInput] = useState('');
	const [orderStatus, setOrderStatus] = useState<
		string | null
	>('all');

	const dispatch = useAppDispatch();

	const handleSelect = (selectedKey: string | null) => {
		setOrderStatus(selectedKey);
	};

	const handleQueryChange = (
		e: FormEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	const filteredOrdersByStatus: TOrder[] = orders?.filter(
		(order) => {
			return order.status === orderStatus;
		},
	);

	const pendingOrders: TOrder[] = orders?.filter((order) => {
		return order.status === 'pending';
	});

	const filteredOrders = useMemo(() => {
		const data =
			orderStatus === 'all'
				? orders
				: filteredOrdersByStatus;

		return data?.filter((order) => {
			return order.orderId
				.toLowerCase()
				.includes(
					escapeRegExp(
						queryInput?.toLocaleLowerCase(),
					),
				);
		});
	}, [
		filteredOrdersByStatus,
		orderStatus,
		orders,
		queryInput,
	]);

	useEffect(() => {
		dispatch(fetchOrders(''));
	}, [dispatch]);

	return (
		<Container className='m-5'>
			<Nav
				variant='tabs'
				defaultActiveKey={orderStatus!}
				className='mb-5'
				onSelect={handleSelect}
			>
				<Nav.Item>
					<Nav.Link eventKey='all'>
						All Orders
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey='pending'>
						Pending{' '}
						<Badge pill bg='danger'>
							{pendingOrders.length}
						</Badge>
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey='accepted'>
						Accepted
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey='completed'>
						Completed
					</Nav.Link>
				</Nav.Item>
			</Nav>

			<input
				type='search'
				className='searchInput'
				placeholder='search products'
				value={queryInput}
				onChange={handleQueryChange}
			/>

			{filteredOrders?.map((order) => (
				<Widget
					key={order?.id}
					widgetTitle={order?.orderId}
					href={`/dashboard/settings/orders/${order?.id}`}
				/>
			))}
		</Container>
	);
}

export default OrderSettings;
