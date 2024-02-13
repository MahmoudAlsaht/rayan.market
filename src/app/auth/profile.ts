import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
	fetchProfile,
	destroyUser,
} from '../../controllers/profile';
import { TUser } from './auth';

export type TProfile = {
	_id: string;
	user: TUser | null;
	contactsInfo?: [
		{
			address: {
				city: string;
				street: string;
			};
			contactNumber: string;
		},
	];
};

const initialState: TProfile = {
	_id: '',
	user: null,
	contactsInfo: [
		{
			address: {
				city: '',
				street: '',
			},
			contactNumber: '',
		},
	],
};

export const ProfileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(
			fetchProfile.fulfilled,
			(state, action) => {
				if (action.payload !== null)
					state = action.payload;
				return state;
			},
		);
		builder.addCase(
			destroyUser.fulfilled,
			(state, action) => {
				if (action.payload !== null)
					state = action.payload;
				return state;
			},
		);
	},
});

export const selectProfile = (state: RootState) => state;

export default ProfileSlice.reducer;
