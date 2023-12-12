import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { fetchUser } from '../../controllers/user';
import { User } from 'firebase/auth';

export type TUser = Partial<User> & {
	username: string | null;
	isAdmin: boolean;
	profile: string;
	docId: string;
};

const initialState: TUser | null = null;

export const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state = action.payload;
			return state;
		});
	},
});

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default UserSlice.reducer;
