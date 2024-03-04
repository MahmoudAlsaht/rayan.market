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
			throw new Error(e.message);
		}
	},
);

export const updateUserPhoneAndUsername = async (data: any) => {
	try {
		const { phone, username, profileId } = data;

		const res = await sendRequestToServer(
			'POST',
			`account/profile/${profileId}/updateUserPhoneAndUsername`,
			{ phone, username },
		);

		setCookies('user', res, 0.3);
	} catch (e: any) {
		console.error(e.message);
		throw new Error(e.message);
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
		throw new Error(e.message);
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

			return {
				username: 'anonymous',
				phone: '',
				role: 'customer',
				profile: '',
				id: '',
			};
		} catch (e: any) {
			throw new Error(e.message);
		}
	},
);
