import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export default function StaffOptions({
	profileId,
}: {
	profileId: string;
}) {
	const navigate = useNavigate();

	return (
		<>
			<ListItem>
				<ListItemButton
					onClick={() =>
						navigate(
							`/dashboard/admin/${profileId}/account-settings`,
						)
					}
					sx={{
						'&:hover': {
							color: 'black',
						},
					}}
				>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText
						primary='إعدادات الحساب'
						sx={{
							ml: '1rem',
						}}
					/>
				</ListItemButton>
			</ListItem>

			<ListItem>
				<ListItemButton
					onClick={() =>
						navigate('/dashboard/settings/orders')
					}
					sx={{
						'&:hover': {
							color: 'black',
						},
					}}
				>
					<ListItemIcon>
						<LocalShippingIcon />
					</ListItemIcon>
					<ListItemText
						primary='الطلبات'
						sx={{
							ml: '1rem',
						}}
					/>
				</ListItemButton>
			</ListItem>
		</>
	);
}
