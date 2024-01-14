import { doc, deleteDoc } from 'firebase/firestore';
import db from '../config';

export default async function destroyDoc(
	collectionName: string,
	docId: string,
) {
	try {
		const docRef = await doc(db, collectionName, docId);
		await deleteDoc(docRef);
	} catch (e: any) {
		console.log(e.message);
		throw new Error(
			'Something went wrong, please try again later',
		);
	}
}
