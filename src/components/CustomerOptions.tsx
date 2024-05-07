import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ContactsIcon from '@mui/icons-material/Contacts';

export default function CustomerOptions({
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
							`/account/profile/${profileId}/account-setting`,
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
						navigate(
							`/account/profile/${profileId}/orders-history`,
						)
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
						primary='طلباتي'
						sx={{
							ml: '1rem',
						}}
					/>
				</ListItemButton>
			</ListItem>

			<ListItem>
				<ListItemButton
					onClick={() =>
						navigate(
							`/account/profile/${profileId}/contact-info`,
						)
					}
					sx={{
						'&:hover': {
							color: 'black',
						},
					}}
				>
					<ListItemIcon>
						<ContactsIcon />
					</ListItemIcon>
					<ListItemText
						primary='عناويني'
						sx={{
							ml: '1rem',
						}}
					/>
				</ListItemButton>
			</ListItem>
		</>
	);
}
