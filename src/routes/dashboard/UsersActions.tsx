/* eslint-disable no-mixed-spaces-and-tabs */
import {
	SyntheticEvent,
	memo,
	useEffect,
	useState,
} from 'react';
import { TUser } from '../../app/auth/auth';
import { fetchUsers } from '../../controllers/user';
import { Tabs, Tab, Box } from '@mui/material';
import AllUsersActions from '../../components/dashboardComponents/AllUsersActions';

const UsersActions = memo(() => {
	const [users, setUsers] = useState<(TUser | null)[]>([null]);
	const [page, setPage] = useState('normalUsers');

	const handleTabsChange = (
		event: SyntheticEvent,
		newPage: string,
	) => {
		setPage(newPage);
	};

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
				<Box sx={{ width: '100%', ml: { sm: 20 } }}>
					<Tabs
						value={page}
						onChange={handleTabsChange}
						textColor='secondary'
						indicatorColor='secondary'
						aria-label='secondary tabs example'
					>
						<Tab
							value='normalUsers'
							label='جميع المستخدمين'
						/>
						<Tab
							value='coUsers'
							label='المسخدمين المساعدين'
						/>
					</Tabs>
				</Box>

				<AllUsersActions
					users={
						page === 'coUsers'
							? users?.filter(
									(user) =>
										((user?.role as string) ===
											'editor' ||
											(user?.role as string) ===
												'staff') &&
										user,
							  )
							: users
					}
					setUsers={setUsers}
					page={page}
				/>
			</main>
		</>
	);
});

export default UsersActions;
