import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytes,
} from 'firebase/storage';

export const uploadImage = async (
	imageFile: File | null,
	uid: string,
) => {
	try {
		const storage = getStorage();
		const imageRef = ref(
			storage,
			`profileImages/${uid}'sProfileImage`,
		);
		const snapShot = await uploadBytes(imageRef, imageFile!);

		const imageURL = await getDownloadURL(snapShot.ref);

		return imageURL;
	} catch (e: any) {
		console.log(e.message);
	}
};
