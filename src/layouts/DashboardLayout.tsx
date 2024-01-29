import { useEffect, useState } from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import '../assets/styles/DashboardStyles.css';
import {
	BsArrowLeftCircle,
	BsArrowRightCircle,
} from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUser, logout } from '../controllers/user';
import { TUser } from '../app/auth/auth';
import { fetchOrders } from '../controllers/order';
import { TOrder } from '../app/store/order';
import { isAdmin } from '../utils';

export default function AuthLayout() {
	const [show, setShow] = useState(false);
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const user: TUser | any = useAppSelector(
		(state) => state.user,
	);

	const orders: TOrder[] = useAppSelector(
		(state) => state.orders,
	);

	const isDashboardHomePage =
		window.location.pathname.includes('settings');

	useEffect(() => {
		dispatch(fetchUser());
		dispatch(fetchOrders(''));
		if (!isAdmin()) navigate('/home');
	}, [dispatch, navigate]);

	const pendingOrders: TOrder[] = orders?.filter((order) => {
		return order.status === 'pending';
	});

	const handleResize = () => setShow(!show);
	const handleLogout = async () => {
		await dispatch(logout());
		dispatch(fetchUser());
		navigate('/home');
	};

	return (
		<>
			<Offcanvas
				show={true}
				scroll={true}
				backdrop={false}
				placement='end'
				className={!show && 'resizeOffcanvas'}
			>
				<Offcanvas.Header>
					<Offcanvas.Title>
						{show ? (
							<BsArrowRightCircle
								className='arrowIcon d-inline'
								onClick={handleResize}
							/>
						) : (
							<BsArrowLeftCircle
								className='arrowIcon d-inline'
								onClick={handleResize}
							/>
						)}
					</Offcanvas.Title>
				</Offcanvas.Header>
				<hr />
				<Offcanvas.Body>
					<Nav className='flex-column arb-text'>
						<Nav.Item>
							<Nav.Link href='/home'>
								Back To Store
							</Nav.Link>
						</Nav.Item>
						<hr />
						<h5 className='text-center mb-3'>
							Settings
						</h5>
						{isDashboardHomePage && (
							<Nav.Item>
								<Nav.Link
									href={`/dashboard/admin/${user?.profile}`}
								>
									Dashboard
								</Nav.Link>
							</Nav.Item>
						)}
						<Nav.Item>
							<Nav.Link
								href={`/account/profile/${user?.profile}/account-setting`}
							>
								Settings
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href='/dashboard/settings/orders'>
								Orders{' '}
								{pendingOrders.length > 0 && (
									<span>
										({pendingOrders?.length})
									</span>
								)}
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href='/dashboard/settings/categories'>
								Categories
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href='/dashboard/settings/products'>
								Products
							</Nav.Link>
						</Nav.Item>
						<hr />
						<Nav.Item>
							<Nav.Link onClick={handleLogout}>
								logout
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Offcanvas.Body>
			</Offcanvas>
			<Outlet />
		</>
	);
}
