import { getStorage, ref, deleteObject } from 'firebase/storage';

export const deleteImage = async (
	uid: string,
	folderName: string,
) => {
	try {
		const storage = getStorage();

		// Create a reference to the file to delete
		const desertRef = ref(
			storage,
			`${folderName}/${uid}'sProfileImage`,
		);

		// Delete the file
		await deleteObject(desertRef);
	} catch (e: any) {
		throw new Error(
			'Something went wrong, please try again later',
		);
	}
};
