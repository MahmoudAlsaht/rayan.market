/* eslint-disable no-mixed-spaces-and-tabs */
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import Widget from '../../components/Widget';

const Profile = memo(() => {
	const { profileId } = useParams();

	const userWidgets = ['Settings', 'Orders', 'Contacts'];

	return (
		<Container className='mt-5'>
			<Row xs={1}>
				{userWidgets.map((widget, index) => (
					<Col md={6} key={index}>
						<Widget
							widgetTitle={widget}
							key={widget}
							href={
								widget.toLowerCase() ===
								'settings'
									? `/account/profile/${profileId}/account-setting`
									: widget.toLowerCase() ===
									  'orders'
									? `/account/profile/${profileId}/orders-history`
									: `/account/profile/${profileId}/contact-info`
							}
						/>
					</Col>
				))}
			</Row>
		</Container>
	);
});

export default Profile;
