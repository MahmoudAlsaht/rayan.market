import { useEffect, useState } from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import '../assets/styles/DashboardStyles.css';
import {
	BsArrowLeftCircle,
	BsArrowRightCircle,
} from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUser, logOut } from '../controllers/user';
import { IUser } from '../app/auth/auth';

export default function AuthLayout() {
	const [show, setShow] = useState(false);
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const user: IUser | any = useAppSelector(
		(state) => state.user,
	);

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	const handleResize = () => setShow(!show);
	const handleLogout = async () => {
		await logOut();
		dispatch(fetchUser());
		navigate('/');
	};

	return (
		<>
			<Offcanvas
				show={true}
				placement='end'
				className={!show && 'resizeOffcanvas'}
			>
				<Offcanvas.Header>
					{show ? (
						<BsArrowRightCircle
							className='arrowIcon'
							onClick={handleResize}
						/>
					) : (
						<BsArrowLeftCircle
							className='arrowIcon'
							onClick={handleResize}
						/>
					)}
					<Offcanvas.Title>
						{show ? (
							<h4
								className='logo ml-2'
								onClick={() => navigate('/')}
							>
								mStore
							</h4>
						) : (
							<h5
								className='logo'
								onClick={() => navigate('/')}
							>
								mStore
							</h5>
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
						<Nav.Item>
							<Nav.Link
								href={`/account/profile/${user?.profile}/account-setting`}
							>
								Admin Settings
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href='/users-settings'>
								Users Settings
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href='/categories-settings'>
								Categories Settings
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href='/products-settings'>
								Products Settings
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
