import { Col, Container, Row } from 'react-bootstrap';
import '../../assets/styles/Dashboard.css';
import Widget from '../../components/dashboardComponents/Widget';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IUser } from '../../app/auth/auth';
import { useEffect } from 'react';
import { fetchUser } from '../../controllers/user';

function Dashboard() {
	const dispatch = useAppDispatch();

	const user: IUser | any = useAppSelector(
		(state) => state.user,
	);

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	const adminWidgets = [
		'settings',
		'users',
		'categories',
		'products',
	];

	return (
		<Container className='mt-5'>
			<Row xs={1}>
				{adminWidgets.map((widget, index) => (
					<Col md={6} key={index}>
						<Widget
							widgetTitle={widget}
							key={widget}
							href={
								widget === 'settings'
									? `/account/profile/${user?.profile}/account-setting`
									: `/dashboard/settings/${widget}`
							}
						/>
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default Dashboard;
