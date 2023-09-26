import db from '../config';
import { doc, getDoc } from 'firebase/firestore';

export default async function getData(
	collection: string,
	id: string,
) {
	const docRef = doc(db, collection, id);
	let result = null;
	let error = null;

	try {
		result = await getDoc(docRef);
	} catch (e: any) {
		error = e;
	}

	return { result, error };
}
