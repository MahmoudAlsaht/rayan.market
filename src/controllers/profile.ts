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
import { TProfile } from '../app/auth/profile';

export const fetchProfile = createAsyncThunk(
	'profile/fetchProfile',
	async (profileId: string) => {
		const { data } =
			(await getData('profiles', 'id', profileId)) ?? {};

		return data ? (data as TProfile) : null;
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
				(
					await getData(
						'profiles',
						'user',
						user?.uid as string,
					)
				).data ?? {};

			setCookies('user', {
				...userData.data,
				email: data?.email,
				username: data?.username,
				docId,
			});

			return profileData
				? (profileData as TProfile)
				: null;
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
		profile: TProfile;
	}) => {
		const { imageFile, password, profile } = options;
		try {
			await checkAuth(password);

			const { docId } =
				(await getData('profiles', 'id', profile?.id)) ??
				{};

			const imageURL = await uploadImage(
				imageFile,
				profile?.id,
				'profilesImages',
			);

			await updateDocs('profiles', docId!, {
				photoURL: imageURL,
			});

			const profileData =
				(await getData('profiles', 'id', profile?.id))
					?.data ?? {};

			return profileData
				? (profileData as TProfile)
				: null;
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
			const auth = await checkAuth(password);
			const user = await getData(
				'users',
				'profile',
				profileId,
			);
			const profile = await getData(
				'profiles',
				'id',
				profileId,
			);

			await deleteImage(profileId, 'profilesImages');
			await destroyDoc('users', user?.docId as string);
			await destroyDoc(
				'profiles',
				profile?.docId as string,
			);
			await deleteUser(auth!);
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
