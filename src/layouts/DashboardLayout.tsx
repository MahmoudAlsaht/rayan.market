import { useEffect, useState } from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import '../assets/styles/DashboardStyles.css';
import {
	BsArrowLeftCircle,
	BsArrowRightCircle,
} from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUser } from '../controllers/user';
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
								className='logo'
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
							<Nav.Link
								href={`/account/profile/${user?.profile}/account-setting`}
							>
								Settings
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link>Option 2</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link>Disabled</Nav.Link>
						</Nav.Item>
					</Nav>
				</Offcanvas.Body>
			</Offcanvas>
			<Outlet />
		</>
	);
}
