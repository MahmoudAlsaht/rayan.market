import EditNoteIcon from '@mui/icons-material/EditNote';
import { TUser } from '../../app/auth/auth';
import {
	Button,
	FormControl,
	IconButton,
	MenuItem,
	Select,
	SelectChangeEvent,
	TableCell,
	TableRow,
} from '@mui/material';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import {
	editUserRole,
	fetchUsers,
} from '../../controllers/user';

type UserSettingsProps = {
	user: TUser | null;
	index: number;
	setUsers: (users: (TUser | null)[]) => void;
};

function UserSettings({
	user,
	index,
	setUsers,
}: UserSettingsProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [validated, setValidated] = useState(false);
	const [roleValue, setRoleValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleIsEditing = () => setIsEditing(!isEditing);

	const handleChange = (e: SelectChangeEvent) => {
		setRoleValue(e.target.value as string);
		if (
			(e.target.value as string) === '' ||
			(e.target.value as string) === 'اختر صلاحية'
		) {
			setValidated(false);
		} else {
			setValidated(true);
		}
	};

	const roleOptions = [
		'اختر صلاحية',
		'Editor',
		'Staff',
		'Customer',
	];

	const handleSubmit = async () => {
		try {
			setIsLoading(true);
			await editUserRole({
				userId: user?._id as string,
				role: roleValue,
			});
			const updatedUsers = await fetchUsers();
			setUsers(updatedUsers as (TUser | null)[]);
			setIsLoading(false);
			handleIsEditing();
		} catch (e: any) {
			setIsLoading(false);
			throw new Error(e.message);
		}
	};

	return (
		<TableRow>
			<TableCell>{index + 1}</TableCell>

			<TableCell>{user?.username}</TableCell>
			<TableCell>{user?.phone}</TableCell>
			{!isEditing ? (
				<TableCell>{user?.role}</TableCell>
			) : (
				<TableCell>
					<FormControl sx={{ mx: 5, minWidth: 120 }}>
						<Select
							labelId='selectRole'
							id='role-select'
							value={roleValue}
							onChange={handleChange}
						>
							{roleOptions?.map((role) => (
								<MenuItem
									value={role?.toLowerCase()}
									key={role?.toLowerCase()}
								>
									{role}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</TableCell>
			)}

			{!isEditing ? (
				<TableCell>
					<IconButton onClick={handleIsEditing}>
						<EditNoteIcon color='warning' />
					</IconButton>
				</TableCell>
			) : (
				<TableCell>
					<legend>
						<Button
							onClick={handleIsEditing}
							variant='outlined'
							color='error'
						>
							الغاء
						</Button>
						<LoadingButton
							type='submit'
							startIcon='حفظ'
							variant='outlined'
							loading={isLoading}
							disabled={!validated}
							onClick={handleSubmit}
						/>
					</legend>
				</TableCell>
			)}
		</TableRow>
	);
}

export default UserSettings;
