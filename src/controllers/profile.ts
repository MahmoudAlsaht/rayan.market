import { createAsyncThunk } from '@reduxjs/toolkit';
import getData from '../firebase/firestore/getData';
import { auth } from '../firebase/config';
import {
	AuthCredential,
	EmailAuthProvider,
	User,
	reauthenticateWithCredential,
	updatePassword,
	updateProfile,
	verifyBeforeUpdateEmail,
} from 'firebase/auth';
import updateDocs from '../firebase/firestore/updateDoc';
import { setCookies } from '../utils';
import { uploadImage } from '../firebase/firestore/uploadFile';

export const fetchProfile = createAsyncThunk(
	'profile/fetchProfile',
	async (profileId: string) => {
		const { data } =
			(await getData(
				'profiles',
				'profileId',
				profileId,
			)) ?? {};

		if (data) {
			return data[0];
		} else {
			return;
		}
	},
);

export const updateUserInfo = async (
	data: any,
	docId: string,
) => {
	try {
		const { email, username, currentPassword } = data;
		const user: User | null = auth.currentUser;

		await checkAuth(currentPassword);

		if (email) await verifyBeforeUpdateEmail(user!, email);

		if (username)
			await updateProfile(user!, {
				displayName: username,
			});

		await updateDocs('users', docId, {
			email: user?.email,
			username: user?.displayName,
		});
	} catch (e: any) {
		console.log(e.message);
	}
};

export const updateUserPassword = async (data: any) => {
	try {
		const user: User | null = auth.currentUser;
		const { newPassword, currentPassword } = data;
		await checkAuth(currentPassword);

		if (newPassword)
			await updatePassword(user!, newPassword);
	} catch (e: any) {
		console.log(e.message);
	}
};

export const updateProfileImage = async (
	imageFile: File | null,
	password: string,
	uid: string,
) => {
	try {
		await checkAuth(password);

		const { data, docId } =
			(await getData('users', 'uid', uid)) ?? {};

		const imageURL = await uploadImage(imageFile, uid);

		await updateDocs('users', docId!, {
			photoURL: imageURL,
		});

		setCookies('user', {
			email: data?.email,
			username: data?.username,
			photoURL: imageURL,
			isAdmin: false,
			profile: data?.profile,
			docId,
		});
	} catch (e: any) {
		console.log(e.message);
	}
};

const checkAuth = async (currentPassword: string) => {
	try {
		const user: User | null = auth.currentUser;
		const credential: AuthCredential =
			EmailAuthProvider.credential(
				user?.email as string,
				currentPassword,
			);
		await reauthenticateWithCredential(user!, credential);
	} catch (e: any) {
		console.log(e.message);
	}
};
