import { Col, Container, Row } from 'react-bootstrap';
import '../../assets/styles/Dashboard.css';
import Widget from '../../components/Widget';

function Dashboard() {
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
						/>
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default Dashboard;
