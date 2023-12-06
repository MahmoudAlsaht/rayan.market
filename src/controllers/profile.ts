import { createAsyncThunk } from '@reduxjs/toolkit';
import getData from '../firebase/firestore/getData';
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
			(await getData('profiles', 'id', profileId)) ?? {};

		if (data) {
			return {
				id: data?.id,
				user: data?.user,
				contact: data?.contact,
			};
		} else {
			return;
		}
	},
);

export const updateUserEmailAndUsername = createAsyncThunk(
	'profile/updateUserEmailAndUsername',
	async (options: { data: any; docId: string }) => {
		const { data, docId } = options;

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

			const userData =
				(await getData(
					'users',
					'uid',
					user?.uid as string,
				)) ?? {};

			const profileData =
				(await getData(
					'profiles',
					'user',
					user?.uid as string,
				)) ?? {};

			setCookies('user', {
				...userData.data,
				email: data?.email,
				username: data?.username,
				docId,
			});

			return {
				user: userData.data?.uid,
				docId: profileData?.docId,
				contact: profileData.data?.contact,
			};
		} catch (e: any) {
			throw new Error(
				'Something went wrong, Please check your credential and try again later.',
			);
		}
	},
);

export const updateUserPassword = createAsyncThunk(
	'profile/updateUserPassword',
	async (data: any) => {
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
	},
);

export const updateProfileImage = createAsyncThunk(
	'profile/updateProfileImage',
	async (options: {
		imageFile: File | null;
		password: string;
		uid: string;
	}) => {
		const { imageFile, password, uid } = options;
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
				...data,
				photoURL: imageURL,
				docId,
			});

			const userData =
				(await getData('users', 'uid', uid as string)) ??
				{};

			const profileData =
				(await getData(
					'profiles',
					'user',
					uid as string,
				)) ?? {};

			return {
				user: userData?.data?.uid,
				docId: userData?.docId,
				contact: profileData?.data?.contact,
			};
		} catch (e: any) {
			throw new Error(
				'Something went wrong, Please check your credential and try again later.',
			);
		}
	},
);

export const destroyUser = createAsyncThunk(
	'profile/destroyUser',
	async (options: { password: string; profileId: string }) => {
		const { password, profileId } = options;
		try {
			const user = await checkAuth(password);

			await deleteImage(
				user?.uid as string,
				'profilesImages',
			);
			await destroyDoc('users', user?.uid as string);
			await destroyDoc('profiles', profileId);
			await deleteUser(user!);
			removeCookies('user');
			return null;
		} catch (e: any) {
			throw new Error(
				'Something went wrong, Please try again later.',
			);
		}
	},
);

export const checkAuth = async (currentPassword: string) => {
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

export const updateUserContactInfo = createAsyncThunk(
	'profile/updateUserEmailAndUsername',
	async (options: { data: any; profileId: string }) => {
		const { data, profileId } = options;

		try {
			const {
				city,
				street,
				phoneNumber,
				currentPassword,
			} = data;

			await checkAuth(currentPassword);

			const profile = await getData(
				'profiles',
				'id',
				profileId as string,
			);
			await updateDocs(
				'profiles',
				profile?.docId as string,
				{
					contact: {
						address: {
							city,
							street,
						},
						phoneNumber,
					},
				},
			);

			const profileData =
				(await getData('profiles', 'id', profileId)) ??
				{};

			return {
				user: profileData.data?.user,
				docId: profileData?.docId,
				contact: profileData?.data?.contact,
			};
		} catch (e: any) {
			throw new Error(
				'Something went wrong, Please check your credential and try again later.',
			);
		}
	},
);
