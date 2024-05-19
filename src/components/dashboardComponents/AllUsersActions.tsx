import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TextField,
	Typography,
	IconButton,
} from '@mui/material';
import { filterData } from '../../utils';
import UserSettings from '../../components/dashboardComponents/UserSettings';
import { ChangeEvent, useMemo, useState } from 'react';
import { TUser } from '../../app/auth/auth';
import AddIcon from '@mui/icons-material/Add';
import CreateCoUserForm from './CreateCoUserForm';

export default function AllUsersActions({
	users,
	setUsers,
	page,
}: {
	setUsers: (users: (TUser | null)[]) => void;
	users: (TUser | null)[];
	page: string;
}) {
	const [queryInput, setQueryInput] = useState('');
	const [show, setShow] = useState(false);

	const toggleShow = () => setShow(!show);

	const handleQueryChange = (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	const filteredUsers = useMemo(() => {
		return filterData(users as any, queryInput);
	}, [users, queryInput]);

	return (
		<TableContainer
			component={Paper}
			sx={{ ml: { sm: 10 } }}
		>
			<Typography variant='h3' sx={{ ml: 3, mb: 2 }}>
				المستخدمين
			</Typography>
			<TextField
				type='search'
				label='ابحث عن اسم مستخدم'
				value={queryInput}
				onChange={handleQueryChange}
				sx={{ ml: 3 }}
			/>
			{page === 'coUsers' && (
				<IconButton onClick={toggleShow}>
					<AddIcon />
				</IconButton>
			)}
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>
							{filteredUsers
								? filteredUsers.length
								: '#'}
						</TableCell>
						<TableCell>Phone</TableCell>
						<TableCell>Role</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{filteredUsers?.map((user, index) => (
						<UserSettings
							setUsers={setUsers}
							key={user?._id}
							user={user}
							index={index}
						/>
					))}
				</TableBody>
			</Table>
			{page === 'coUsers' && (
				<IconButton onClick={toggleShow}>
					<AddIcon />
				</IconButton>
			)}

			{page === 'coUsers' && (
				<CreateCoUserForm
					show={show}
					handleClose={toggleShow}
					setUsers={setUsers}
				/>
			)}
		</TableContainer>
	);
}
