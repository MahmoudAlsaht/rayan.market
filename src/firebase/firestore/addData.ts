import db from '../config';
import { doc, setDoc } from 'firebase/firestore';

export default async function addData(
	collection: string,
	id: string,
	data: any,
) {
	let result = null;
	let error = null;

	try {
		result = await setDoc(doc(db, collection, id), data, {
			merge: true,
		});
	} catch (e: any) {
		error = e;
	}

	return { result, error };
}
