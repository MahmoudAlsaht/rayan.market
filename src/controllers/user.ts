import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../firebase/config';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	User,
	updateProfile,
} from 'firebase/auth';
import { getCookies, removeCookies, setCookies } from '../utils';
import addData from '../firebase/firestore/addData';
import getData from '../firebase/firestore/getData';
import { v4 as uuidv4 } from 'uuid';

export type IUser = Partial<User> & {
	username: string | null;
	isAdmin: boolean;
	photoURL: string;
	profile: string;
};

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	() => {
		const user = getCookies('user');

		return user ? user : null;
	},
);

export const signUp = async (
	email: any,
	password: any,
	displayName: string,
) => {
	try {
		const res = await createUserWithEmailAndPassword(
			auth,
			email,
			password,
		);
		await updateProfile(res.user, { displayName });

		const profileId = `${res.user.uid}-user-${
			res.user.displayName
		}${uuidv4()}-profile`;

		await addData('profiles', {
			uid: profileId,
			user: res.user.uid,
		});

		await addData('users', {
			uid: `${res.user.uid}-user-${
				res.user.displayName
			}${uuidv4()}-account`,
			userId: res.user.uid,
			username: res.user.displayName,
			email: res.user.email,
			photoURL: res.user.photoURL,
			isAdmin: false,
			profile: profileId,
		});

		await signIn(email, password);
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
		const docSnap = await getData('users');

		docSnap?.docs.map((doc: any) => {
			if (doc.data().userId === res.user.uid)
				setCookies('user', doc.data());
		});
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
