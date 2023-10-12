import { doc, updateDoc } from 'firebase/firestore';
import db from '../config';

export default async function updateDocs(
	collectionName: string,
	docId: string,
	data: any,
) {
	try {
		const docRef = await doc(db, collectionName, docId);
		await updateDoc(docRef, { ...data });
	} catch (e: any) {
		throw new Error(
			'Something went wrong, please try again later',
		);
	}
}
