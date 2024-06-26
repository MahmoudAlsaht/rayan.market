import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequestToServer, setCookies } from '../utils';

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
			throw new Error('something went wrong');
		}
	},
);

export const updateUserPhoneAndUsername = async (data: any) => {
	try {
		const { phone, username, profileId } = data;

		await sendRequestToServer(
			'POST',
			`account/profile/${profileId}/updateUserPhoneAndUsername`,
			{ phone, username },
		);
	} catch (e: any) {
		throw new Error('something went wrong');
	}
};

export const updateUserPassword = async (data: any) => {
	try {
		const { newPassword, currentPassword, profileId } = data;

		if (!newPassword) return;

		await sendRequestToServer(
			'POST',
			`account/profile/${profileId}/updateUserPassword`,
			{ newPassword, currentPassword },
		);
	} catch (e: any) {
		throw new Error('something went wrong');
	}
};

export const destroyUser = createAsyncThunk(
	'profile/destroyUser',
	async (options: { password: string; profileId: string }) => {
		const { password, profileId } = options;
		try {
			await sendRequestToServer(
				'DELETE',
				`account/profile/${profileId}/delete-account`,
				{ password },
			);
			setCookies('token', null);

			return null;
		} catch (e: any) {
			throw new Error('something went wrong');
		}
	},
);
