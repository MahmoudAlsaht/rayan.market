import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DiscountIcon from '@mui/icons-material/Discount';
import CategoryIcon from '@mui/icons-material/Category';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import SettingsIcon from '@mui/icons-material/Settings';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

export default function EditorOptions({
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
						navigate(
							'/dashboard/settings/categories',
						)
					}
					sx={{
						'&:hover': {
							color: 'black',
						},
					}}
				>
					<ListItemIcon>
						<CategoryIcon />
					</ListItemIcon>
					<ListItemText
						primary='الأقسام'
						sx={{
							ml: '1rem',
						}}
					/>
				</ListItemButton>
			</ListItem>

			<ListItem>
				<ListItemButton
					onClick={() =>
						navigate('/dashboard/settings/brands')
					}
					sx={{
						'&:hover': {
							color: 'black',
						},
					}}
				>
					<ListItemIcon>
						<BrandingWatermarkIcon />
					</ListItemIcon>
					<ListItemText
						primary='العلامات التجارية'
						sx={{
							ml: '1rem',
						}}
					/>
				</ListItemButton>
			</ListItem>

			<ListItem>
				<ListItemButton
					onClick={() =>
						navigate('/dashboard/settings/products')
					}
					sx={{
						'&:hover': {
							color: 'black',
						},
					}}
				>
					<ListItemIcon>
						<Inventory2Icon />
					</ListItemIcon>
					<ListItemText
						primary='المنتجات'
						sx={{
							ml: '1rem',
						}}
					/>
				</ListItemButton>
			</ListItem>

			<ListItem>
				<ListItemButton
					onClick={() =>
						navigate('/dashboard/settings/promos')
					}
					sx={{
						'&:hover': {
							color: 'black',
						},
					}}
				>
					<ListItemIcon>
						<DiscountIcon />
					</ListItemIcon>
					<ListItemText
						primary='كوبونات الخصم'
						sx={{
							ml: '1rem',
						}}
					/>
				</ListItemButton>
			</ListItem>

			<ListItem>
				<ListItemButton
					onClick={() =>
						navigate('/dashboard/settings/banners')
					}
					sx={{
						'&:hover': {
							color: 'black',
						},
					}}
				>
					<ListItemIcon>
						<ViewCarouselIcon />
					</ListItemIcon>
					<ListItemText
						primary='اللافتات'
						sx={{
							ml: '1rem',
						}}
					/>
				</ListItemButton>
			</ListItem>

			<ListItem>
				<ListItemButton
					onClick={() =>
						navigate('/dashboard/settings/districts')
					}
					sx={{
						'&:hover': {
							color: 'black',
						},
					}}
				>
					<ListItemIcon>
						<LocationSearchingIcon />
					</ListItemIcon>
					<ListItemText
						primary='المناطق المدعومة'
						sx={{
							ml: '1rem',
						}}
					/>
				</ListItemButton>
			</ListItem>
		</>
	);
}
