import { createAsyncThunk } from '@reduxjs/toolkit';
import getData from '../firebase/firestore/getData';
import { auth } from '../firebase/config';
import {
	EmailAuthProvider,
	reauthenticateWithCredential,
	updatePassword,
	updateProfile,
	verifyBeforeUpdateEmail,
} from 'firebase/auth';
import updateDocs from '../firebase/firestore/updateDoc';
// import updateDocs from '../firebase/firestore/updateDoc';

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
			console.log(data[0]);
			return data[0];
		} else {
			return;
		}
	},
);

export const editProfile = async (data: any, docId: string) => {
	try {
		const { username, newPassword, currentPassword } = data;
		const { email } = data;
		const user: any = auth.currentUser;
		const credential = EmailAuthProvider.credential(
			user.email,
			currentPassword,
		);
		await reauthenticateWithCredential(user, credential);
		if (email) await verifyBeforeUpdateEmail(user, email);

		if (newPassword) await updatePassword(user, newPassword);
		if (username)
			await updateProfile(user, { displayName: username });

		await updateDocs('users', docId, {
			email: user?.email,
			username: user?.displayName,
		});
	} catch (e: any) {
		console.log(e.message);
	}
};
