import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
	fetchProfile,
	updateProfileImage,
	destroyUser,
} from '../../controllers/profile';
import { TUser } from './auth';

export type TImage = {
	_id: string;
	filename: string;
	path: string;
	imageType: string;
};

export type TProfileImage = TImage & {
	profile: TProfile;
};

export type TProfile = {
	id: string;
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
	profileImage: TProfileImage | null;
};

const initialState: TProfile = {
	id: '',
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
	profileImage: null,
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
			updateProfileImage.fulfilled,
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
