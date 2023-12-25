import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../firebase/config';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	sendEmailVerification,
	sendPasswordResetEmail,
} from 'firebase/auth';
import { getCookies, removeCookies, setCookies } from '../utils';
import addData from '../firebase/firestore/addData';
import getData from '../firebase/firestore/getData';
import { v4 as uuidv4 } from 'uuid';
import updateDocs from '../firebase/firestore/updateDoc';
import { createNewContactInfo } from './contact';

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

		// create a new profile and connect to the new user
		await addData('profiles', {
			id: profileId,
			user: res.user.uid,
		});

		// create an empty contact info for each profile
		await createNewContactInfo(profileId, {
			city: '',
			street: '',
			phoneNumber: '',
		});

		// create a new document for each user to reference user's data
		await addData('users', {
			uid: res.user.uid,
			username: res.user.displayName,
			email: res.user.email,
			photoURL: res.user.photoURL,
			isAdmin: false,
			profile: profileId,
		});

		await sendEmailVerification(res.user);
		await signIn(email, password);
	} catch (e: any) {
		throw new Error(
			'Something went wrong, Please check your credential and try again later.',
		);
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
		const { data, docId } =
			(await getData('users', 'uid', res?.user?.uid)) ??
			{};

		await updateDocs('users', docId as string, {
			email: res?.user?.email,
		});

		setCookies('user', {
			...data,
			email: res?.user?.email,
			docId,
		});
	} catch (e: any) {
		throw new Error(
			'Something went wrong, Please check your credential and try again later.',
		);
	}
};

export const logOut = async () => {
	try {
		await signOut(auth);
		removeCookies('user');
	} catch (e: any) {
		throw new Error(
			'Something went wrong, Please try again later',
		);
	}
};

export const resetPassword = async (email: string) => {
	try {
		await sendPasswordResetEmail(auth, email);
	} catch (e: any) {
		throw new Error(
			'Something went wrong, Please try again later',
		);
	}
};

export const createAnonymousUser = async (data: {
	firstName: string;
	lastName: string;
	email: string;
	city: string;
	street: string;
	phoneNumber: string;
}) => {
	try {
		const anonymousUser = await addData(
			'anonymousUsers',
			data,
		);
		return anonymousUser.id;
	} catch (e: any) {
		console.log(e.message);
		throw new Error('Something went wrong!');
	}
};
