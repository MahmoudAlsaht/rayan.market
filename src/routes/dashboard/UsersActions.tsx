import {
	ChangeEvent,
	memo,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { TUser } from '../../app/auth/auth';
import { fetchUsers } from '../../controllers/user';
import { filterData } from '../../utils';
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
} from '@mui/material';
import UserSettings from '../../components/dashboardComponents/UserSettings';

const UsersActions = memo(() => {
	const [queryInput, setQueryInput] = useState('');

	const [users, setUsers] = useState<(TUser | null)[]>([null]);

	const handleQueryChange = (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		setQueryInput(e.currentTarget.value);
	};

	const filteredUsers = useMemo(() => {
		return filterData(users as any, queryInput);
	}, [users, queryInput]);

	useEffect(() => {
		const getUsers = async () => {
			const fetchedUsers = await fetchUsers();
			setUsers(fetchedUsers as (TUser | null)[]);
		};
		getUsers();
	}, []);

	return (
		<>
			<main dir='rtl'>
				<TableContainer
					component={Paper}
					sx={{ ml: { sm: 10 } }}
				>
					<Typography variant='h3' sx={{ ml: 3 }}>
						المستخدمين
					</Typography>
					<TextField
						type='search'
						label='ابحث عن اسم مستخدم'
						value={queryInput}
						onChange={handleQueryChange}
						sx={{ ml: 3 }}
					/>

					<Table sx={{ minWidth: 650 }}>
						<TableHead>
							<TableRow>
								<TableCell>
									{users ? users.length : '#'}
								</TableCell>
								<TableCell>Username</TableCell>
								<TableCell>Phone</TableCell>
								<TableCell>Role</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filteredUsers?.map(
								(user, index) => (
									<UserSettings
										setUsers={setUsers}
										key={user?._id}
										user={user}
										index={index}
									/>
								),
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</main>
		</>
	);
});

export default UsersActions;
