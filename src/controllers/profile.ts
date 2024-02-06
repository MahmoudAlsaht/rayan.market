import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	isAuthenticated,
	sendRequestToServer,
	setCookies,
} from '../utils';
import { uploadImage } from '../firebase/firestore/uploadFile';

export const fetchProfile = createAsyncThunk(
	'profile/fetchProfile',
	async (profileId: string) => {
		try {
			const res = await sendRequestToServer(
				'GET',
				`account/profile/${profileId}`,
			);
			return res;
		} catch (e: any) {
			throw new Error(e.message);
		}
	},
);

export const updateUserEmailAndUsername = async (data: any) => {
	try {
		if (!isAuthenticated())
			throw new Error('You Are Not Authorized');

		const { email, username, password, profileId } = data;

		const res = await sendRequestToServer(
			'POST',
			`account/profile/${profileId}/updateUserEmailAndUsername`,
			{ email, username, password },
		);

		setCookies('user', res, 0.3);
	} catch (e: any) {
		console.error(e.message);
		throw new Error(e.message);
	}
};

export const updateUserPassword = async (data: any) => {
	try {
		if (!isAuthenticated())
			throw new Error('You Are Not Authorized');

		const { newPassword, currentPassword, profileId } = data;

		if (!newPassword) return;

		await sendRequestToServer(
			'POST',
			`account/profile/${profileId}/updateUserPassword`,
			{ newPassword, currentPassword },
		);
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const updateProfileImage = createAsyncThunk(
	'profile/updateProfileImage',
	async (options: {
		imageFile: File | null;
		password: string;
		profileId: string;
	}) => {
		try {
			if (!isAuthenticated())
				throw new Error('You Are Not Authorized');
			const { imageFile, password, profileId } = options;

			const imageURL = await uploadImage(
				imageFile,
				profileId as string,
				'profilesImages',
			);

			console.log(imageURL);
			const res = await sendRequestToServer(
				'POST',
				`account/profile/${profileId}/upload-profile-image`,
				{ imageURL, password },
			);

			return res;
		} catch (e: any) {
			throw new Error(e.message);
		}
	},
);

export const destroyUser = createAsyncThunk(
	'profile/destroyUser',
	async (options: { password: string; profileId: string }) => {
		const { password, profileId } = options;
		try {
			if (!isAuthenticated())
				throw new Error('You Are Not Authorized');

			await sendRequestToServer(
				'DELETE',
				`account/profile/${profileId}/delete-account`,
				{ password },
			);
			setCookies('user', {
				username: 'anonymous',
				email: '',
				isAdmin: false,
				profile: '',
				id: '',
				phoneNumber: '',
			});
			return null;
		} catch (e: any) {
			throw new Error(e.message);
		}
	},
);
