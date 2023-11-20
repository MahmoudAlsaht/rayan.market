import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
	fetchProfile,
	updateUserEmailAndUsername,
	updateProfileImage,
	destroyUser,
} from '../../controllers/profile';

export type IProfile = {
	uid: string;
	user: string;
};

const initialState: IProfile | any = null;

export const ProfileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(
			fetchProfile.fulfilled,
			(state, action) => {
				state = action.payload;
				return state;
			},
		);
		builder.addCase(
			updateUserEmailAndUsername.fulfilled,
			(state, action) => {
				state = action.payload;
				return state;
			},
		);

		builder.addCase(
			updateProfileImage.fulfilled,
			(state, action) => {
				state = action.payload;
				return state;
			},
		);
		builder.addCase(
			destroyUser.fulfilled,
			(state, action) => {
				state = action.payload;
				return state;
			},
		);
	},
});

export const selectProfile = (state: RootState) => state;

export default ProfileSlice.reducer;
