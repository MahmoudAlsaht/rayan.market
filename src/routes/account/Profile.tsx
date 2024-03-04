/* eslint-disable no-mixed-spaces-and-tabs */
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import Widget from '../../components/Widget';
import { Container, Grid } from '@mui/material';

const Profile = memo(() => {
	const { profileId } = useParams();

	const userWidgets = ['Settings', 'Orders', 'Contacts'];

	return (
		<Container>
			<Grid container spacing={1}>
				{userWidgets.map((widget, index) => (
					<Grid md={6} key={index}>
						<Widget
							widgetTitle={
								widget.toLowerCase() ===
								'settings'
									? 'معلومات الحساب'
									: widget.toLowerCase() ===
									  'orders'
									? 'طلباتي'
									: 'عناويني'
							}
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
					</Grid>
				))}
			</Grid>
		</Container>
	);
});

export default Profile;
