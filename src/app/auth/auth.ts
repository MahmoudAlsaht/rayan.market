import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { fetchUser, logout } from '../../controllers/user';
import { TOrder } from '../store/order';
import { TContactInfo } from '../../controllers/contact';

export type TUser = {
	_id: string;
	username: string;
	role: string;
	phone: string;
	profile: string;
	orders?: string[];
};

export type TAnonymousUser = {
	_id: string;
	username: string;
	phone: string;
	orders?: TOrder[];
	contact?: TContactInfo;
};

const initialState: TUser = {
	_id: '',
	username: 'anonymous',
	phone: '',
	role: 'customer',
	profile: '',
};

export const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state = action.payload;
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
