import { getStorage, ref, deleteObject } from 'firebase/storage';

export const deleteImage = async (
	name: string,
	folderName: string,
) => {
	try {
		const storage = getStorage();

		// Create a reference to the file to delete
		const desertRef = ref(
			storage,
			`${folderName}/${name}'s-Image`,
		);

		// Delete the file
		await deleteObject(desertRef);
	} catch (e: any) {
		console.log(e.message);
		throw new Error(
			'Something went wrong, please try again later',
		);
	}
};
