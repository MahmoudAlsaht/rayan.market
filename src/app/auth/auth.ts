import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { fetchUser, logout } from '../../controllers/user';

export type TUser = {
	id: string;
	username: string;
	email: string;
	isAdmin: boolean;
	phoneNumber?: string;
	profile: string;
	orders?: string[];
};

const initialState: TUser = {
	id: '',
	username: 'anonymous',
	email: '',
	phoneNumber: '',
	isAdmin: false,
	profile: '',
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
