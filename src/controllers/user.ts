/* eslint-disable no-mixed-spaces-and-tabs */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	getCookies,
	removeCookies,
	sendRequestToServer,
	setCookies,
} from '../utils';
import { TUser } from '../app/auth/auth';

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async () => {
		try {
			const token = getCookies('token');

			if (token == undefined) return null;

			const user = await sendRequestToServer(
				'GET',
				'auth',
			);

			return user;
		} catch (e: any) {
			console.error(e.message);
		}
	},
);

export const fetchUsers = async () => {
	try {
		const users: (TUser | null)[] =
			await sendRequestToServer('GET', 'auth/users');

		return users;
	} catch (e: any) {
		console.error(e.message);
	}
};

export const editUserRole = async ({
	userId,
	role,
}: {
	userId: string;
	role: string;
}) => {
	try {
		await sendRequestToServer('POST', 'auth/users', {
			userId,
			role,
		});
	} catch (e: any) {
		console.error(e.message);
	}
};

export const signUp = async (
	phone: any,
	password: any,
	displayName: string,
) => {
	try {
		if (displayName === 'anonymous')
			throw new Error('You cannot pick this username');
		const res: any = await sendRequestToServer(
			'post',
			'auth/signup',
			{
				username: displayName,
				phone,
				password,
			},
		);
		setCookies('token', res.token, 0.3);
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const signIn = async (
	phone: string,
	password: string,
) => {
	try {
		const res = await sendRequestToServer(
			'post',
			'auth/signin',
			{
				phone,
				password,
			},
		);
		setCookies('token', res.token, 0.3);
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const logout = createAsyncThunk(
	'user/logout',
	async () => {
		try {
			removeCookies('token');
			removeCookies('cart');
			return {
				username: 'anonymous',
				phone: '',
				role: 'customer',
				profile: null,
				_id: '',
			};
		} catch (e: any) {
			throw new Error(
				'Something went wrong, Please try again later',
			);
		}
	},
);

export const createAnonymousUser = async (data: {
	name: string;
	phone: string;
	districtId: string;
}) => {
	try {
		const anonymousUser = await sendRequestToServer(
			'post',
			'auth/anonymous',
			data,
		);

		return anonymousUser;
	} catch (e: any) {
		throw new Error('Something went wrong!');
	}
};
