import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytes,
} from 'firebase/storage';

export const uploadImage = async (
	imageFile: File | null,
	username: string,
) => {
	try {
		const storage = getStorage();
		const imageRef = ref(
			storage,
			`profileImages/${username}'sProfileImage`,
		);
		const snapShot = await uploadBytes(imageRef, imageFile!);

		const imageURL = await getDownloadURL(snapShot.ref);

		return imageURL;
	} catch (e: any) {
		console.log(e.message);
	}
};
