import { createAsyncThunk } from '@reduxjs/toolkit';
import getData from '../firebase/firestore/getData';

export const fetchProfile = createAsyncThunk(
	'profile/fetchProfile',
	async (profileId: string) => {
		const docSnap = await getData('profiles');

		const profile = await docSnap?.docs.map((doc: any) => {
			if (doc.data().uid === profileId) return doc.data();
		});

		if (profile) {
			console.log(profile[0]);
			return profile[0];
		} else {
			return;
		}
	},
);
