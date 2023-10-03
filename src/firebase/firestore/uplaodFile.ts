import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytes,
} from 'firebase/storage';
import updateDocs from './updateDoc';
import getData from './getData';
import { setCookies } from '../../utils';

export const uploadImage = async (
	imageFile: File | null,
	username: string,
	uid: string,
) => {
	try {
		const storage = getStorage();
		const imageRef = ref(
			storage,
			`profileImages/${username}'sProfileImage`,
		);
		const snapShot = await uploadBytes(imageRef, imageFile!);

		const imageURL = await getDownloadURL(snapShot.ref);

		const { data, docId } =
			(await getData('users', 'uid', uid)) ?? {};

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
