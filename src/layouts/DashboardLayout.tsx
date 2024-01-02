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

export default function AuthLayout() {
	const [show, setShow] = useState(false);
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const user: TUser | any = useAppSelector(
		(state) => state.user,
	);

	const isDashboardHomePage =
		window.location.pathname.includes('settings');

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	const handleResize = () => setShow(!show);
	const handleLogout = async () => {
		await dispatch(logout());
		dispatch(fetchUser());
		navigate('/');
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
							<Nav.Link href='/'>
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
							<Nav.Link href='/dashboard/settings/users'>
								Orders
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
