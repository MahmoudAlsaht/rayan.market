import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { fetchProfile } from '../../controllers/profile';

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
	},
});

export const selectProfile = (state: RootState) => state;

export default ProfileSlice.reducer;
