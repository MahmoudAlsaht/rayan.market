/* eslint-disable no-mixed-spaces-and-tabs */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	getCookies,
	removeCookies,
	sendRequestToServer,
	setCookies,
} from '../utils';
import { TUser } from '../app/auth/auth';
import { TUserCredentials } from '../routes/Signup';

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async () => {
		try {
			const token = getCookies('token');

			if (token == undefined) return null;

			const user: TUser | null = await sendRequestToServer(
				'GET',
				'auth',
			);

			return user;
		} catch (e: any) {
			throw new Error('something went wrong');
		}
	},
);

export const fetchUsers = async () => {
	try {
		const users: (TUser | null)[] =
			await sendRequestToServer('GET', 'auth/users');

		return users;
	} catch (e: any) {
		throw new Error('something went wrong');
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
		throw new Error('something went wrong');
	}
};

export const createUser = async (
	adminId: string,
	phone: string | null,
	password: string | null,
	username: string,
	role: string,
) => {
	try {
		if (username === 'anonymous')
			throw new Error('You cannot pick this username');

		const user: TUser | null = await sendRequestToServer(
			'post',
			'auth/create-user',
			{
				adminId,
				username,
				phone,
				password,
				role,
			},
		);
		return user;
	} catch (e: any) {
		throw new Error('something went wrong');
	}
};

export const signUpPhone = async (phone: string | null) => {
	try {
		const res: TUserCredentials = await sendRequestToServer(
			'post',
			'auth/signup-phone',
			{
				phone,
			},
		);
		return res;
	} catch (e: any) {
		throw new Error('something went wrong');
	}
};

export const signUpUsernameAndPassword = async (
	userId: string | null,
	password: string | null,
	displayName: string,
	verificationCode: string | null,
) => {
	try {
		if (displayName === 'anonymous')
			throw new Error('You cannot pick this username');
		const res: any = await sendRequestToServer(
			'post',
			'auth/signup-username-and-password',
			{
				username: displayName,
				userId,
				password,
				verificationCode,
			},
		);
		setCookies('token', res.token, 60);
	} catch (e: any) {
		throw new Error('something went wrong');
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
		setCookies('token', res.token, 60);
	} catch (e: any) {
		throw new Error('something went wrong');
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

export const verifyAnonymousUserPhone = async (data: {
	phone: string;
}) => {
	try {
		const res: TUserCredentials = await sendRequestToServer(
			'post',
			'auth/anonymous-send-verificationCode',
			data,
		);

		return res;
	} catch (e: any) {
		throw new Error('Something went wrong!');
	}
};

export const createAnonymousUser = async (data: {
	name: string;
	userId: string | null;
	districtId: string;
	verificationCode: string | null;
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

export const requestVerificationCode = async (
	phoneNumber: string,
) => {
	try {
		const userId = await sendRequestToServer(
			'post',
			'auth/reset-password',
			{ phone: phoneNumber },
		);

		return userId as string;
	} catch (e: any) {
		throw new Error('Something went wrong!');
	}
};

export const check6DigitCode = async ({
	verificationCode,
	user,
}: {
	verificationCode: string;
	user: string;
}) => {
	try {
		const userId = await sendRequestToServer(
			'post',
			`auth/reset-password/${user}`,
			{ verificationCode },
		);

		return userId as string;
	} catch (e: any) {
		throw new Error('Something went wrong!');
	}
};

export const updatePassword = async ({
	passwordConfirmation,
	password,
	user,
}: {
	passwordConfirmation: string;
	password: string;
	user: string;
}) => {
	try {
		const userId = await sendRequestToServer(
			'post',
			`auth/reset-password/${user}/update-password`,
			{ passwordConfirmation, password },
		);

		return userId as string;
	} catch (e: any) {
		throw new Error('Something went wrong!');
	}
};
