import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { fetchUser, logout } from '../../controllers/user';
import { User } from 'firebase/auth';

export type TUser = Partial<User> & {
	username: string;
	isAdmin: boolean;
	profile: string;
	docId: string;
	orderId?: string;
};

const initialState: TUser = {
	username: 'anonymous',
	email: '',
	isAdmin: false,
	profile: '',
	docId: '',
};

export const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			if (action.payload !== null) state = action.payload;
			return state;
		});
		builder.addCase(logout.fulfilled, (state, action) => {
			state = action.payload;
			return state;
		});
	},
});

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default UserSlice.reducer;
