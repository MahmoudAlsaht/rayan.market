import { createAsyncThunk } from '@reduxjs/toolkit';
import getData, { DocType } from '../firebase/firestore/getData';
import { auth } from '../firebase/config';
import {
	AuthCredential,
	EmailAuthProvider,
	User,
	deleteUser,
	reauthenticateWithCredential,
	updateEmail,
	updatePassword,
	updateProfile,
	verifyBeforeUpdateEmail,
} from 'firebase/auth';
import updateDocs from '../firebase/firestore/updateDoc';
import { removeCookies, setCookies } from '../utils';
import { uploadImage } from '../firebase/firestore/uploadFile';
import { deleteImage } from '../firebase/firestore/deleteFile';
import destroyDoc from '../firebase/firestore/deleteDoc';

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
		const user = await checkAuth(currentPassword);

		!user?.emailVerified
			? await verifyBeforeUpdateEmail(user!, email)
			: await updateEmail(user!, email);

		if (username)
			await updateProfile(user!, {
				displayName: username,
			});

		await updateDocs('users', docId, {
			email: user?.email,
			username: user?.displayName,
		});
	} catch (e: any) {
		throw new Error(
			'Something went wrong, Please check your credential and try again later.',
		);
	}
};

export const updateUserPassword = async (data: any) => {
	try {
		const { newPassword, currentPassword } = data;
		const user = await checkAuth(currentPassword);

		if (newPassword)
			await updatePassword(user!, newPassword);
	} catch (e: any) {
		throw new Error(
			'Something went wrong, Please check your credential and try again later.',
		);
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

		const imageURL = await uploadImage(
			imageFile,
			uid,
			'profilesImages',
		);

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
		throw new Error(
			'Something went wrong, Please check your credential and try again later.',
		);
	}
};

export const destroyUser = async (
	password: string,
	profileId: string,
) => {
	try {
		const user = await checkAuth(password);

		const userDoc: DocType | undefined = await getData(
			'users',
			'uid',
			user?.uid as string,
		);

		const profileDoc: DocType | undefined = await getData(
			'profiles',
			'id',
			profileId,
		);

		await deleteImage(user?.uid as string, 'profilesImages');
		await destroyDoc('users', userDoc!.docId!);
		await destroyDoc('profiles', profileDoc!.docId!);
		await deleteUser(user!);
		removeCookies('user');
	} catch (e: any) {
		throw new Error(
			'Something went wrong, Please try again later.',
		);
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

		return user;
	} catch (e: any) {
		throw new Error(e.message);
	}
};
