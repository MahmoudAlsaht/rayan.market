/* eslint-disable no-mixed-spaces-and-tabs */
import {
	ChangeEvent,
	SyntheticEvent,
	memo,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchOrders } from '../../controllers/order';
import { TOrder } from '../../app/store/order';
import Widget from '../../components/Widget';
import { escapeRegExp } from '../../utils';
import {
	Badge,
	Container,
	Tab,
	Tabs,
	TextField,
} from '@mui/material';

const OrderSettings = memo(() => {
	const orders: TOrder[] = useAppSelector(
		(state) => state.orders,
	);
	const [queryInput, setQueryInput] = useState('');
	const [orderStatus, setOrderStatus] = useState<
		string | null
	>('all');

	const dispatch = useAppDispatch();

	const handleQueryChange = (
		e: ChangeEvent<HTMLInputElement>,
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
			return order?.orderId
				?.toLowerCase()
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

	const handleChange = (
		event: SyntheticEvent,
		newValue: string,
	) => {
		setOrderStatus(newValue);
	};

	return (
		<main dir='rtl'>
			<Container sx={{ ml: 10 }}>
				<Tabs
					value={orderStatus}
					onChange={handleChange}
					variant='scrollable'
					scrollButtons='auto'
					aria-label='scrollable auto tabs example'
					sx={{ my: 5 }}
				>
					<Tab label='الكل' value='all' />
					<Tab
						label={
							pendingOrders.length > 0 ? (
								<Badge
									badgeContent={
										pendingOrders.length
									}
									color='primary'
								>
									<span
										style={{
											marginLeft: '.65rem',
										}}
									>
										في انتظار الموافقة
									</span>
								</Badge>
							) : (
								'في انتظار الموافقة'
							)
						}
						value='pending'
					/>
					<Tab label='قبلت' value='accepted' />
					<Tab label='اكتملت' value='completed' />
					<Tab label='رفضت' value='rejected' />
					<Tab label='ألغيت' value='canceled' />
				</Tabs>

				<TextField
					type='search'
					label='ابحث عن طلب'
					value={queryInput}
					onChange={handleQueryChange}
				/>

				{filteredOrders?.map((order) => (
					<Widget
						key={order?._id}
						widgetTitle={order?.orderId}
						href={`/dashboard/settings/orders/${order?._id}`}
					/>
				))}
			</Container>
		</main>
	);
});
export default OrderSettings;
