import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../firebase/config';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	User,
} from 'firebase/auth';
import { getCookies, removeCookies, setCookies } from '../utils';

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	() => {
		const user = getCookies('user');

		return user ? user : null;
	},
);

export const signUp = async (email: any, password: any) => {
	try {
		const res = await createUserWithEmailAndPassword(
			auth,
			email,
			password,
		);
		const user: Partial<User> = {
			displayName: res.user.displayName,
			email: res.user.email,
			uid: res.user.uid,
			photoURL: res.user.photoURL,
		};
		setCookies('user', user);
	} catch (e: any) {
		console.log(e.message);
	}
};

export const signIn = async (
	email: string,
	password: string,
) => {
	try {
		const res = await signInWithEmailAndPassword(
			auth,
			email,
			password,
		);
		const user: Partial<User> = {
			displayName: res.user.displayName,
			email: res.user.email,
			uid: res.user.uid,
			photoURL: res.user.photoURL,
		};
		setCookies('user', user);
	} catch (e: any) {
		console.log(e.message);
	}
};

export const logOut = async () => {
	try {
		await signOut(auth);
		removeCookies('user');
	} catch (e: any) {
		console.log(e.message);
	}
};
