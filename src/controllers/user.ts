import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	getCookies,
	isAuthenticated,
	removeCookies,
	sendRequestToServer,
	setCookies,
} from '../utils';
import { TUser } from '../app/auth/auth';

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	() => {
		const user: TUser | null = getCookies('user');

		return user as any;
	},
);

export const signUp = async (
	email: any,
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
				email,
				password,
				isAdmin: false,
				phoneNumber: 'none',
			},
		);
		setCookies('user', res, 0.3);
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const signIn = async (
	email: string,
	password: string,
) => {
	try {
		const res = await sendRequestToServer(
			'post',
			'auth/signin',
			{
				email,
				password,
			},
		);
		setCookies('user', res, 0.3);
	} catch (e: any) {
		throw new Error(e.message);
	}
};

export const logout = createAsyncThunk(
	'user/logout',
	async () => {
		try {
			if (!isAuthenticated())
				throw new Error('You Are Not Authorized');

			removeCookies('user');
			return {
				username: 'anonymous',
				email: '',
				isAdmin: false,
				profile: '',
				_id: '',
				phoneNumber: '',
			};
		} catch (e: any) {
			throw new Error(
				'Something went wrong, Please try again later',
			);
		}
	},
);

export const createAnonymousUser = async (data: {
	firstName: string;
	lastName: string;
	email: string;
	city: string;
	street: string;
	contactNumber: string;
}) => {
	try {
		const anonymousUser = await sendRequestToServer(
			'post',
			'auth/anonymous',
			data,
		);

		return anonymousUser;
	} catch (e: any) {
		console.log(e.message);
		throw new Error('Something went wrong!');
	}
};
