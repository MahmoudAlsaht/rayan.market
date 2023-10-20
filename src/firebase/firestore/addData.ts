import db from '../config';
import { addDoc, collection } from 'firebase/firestore';

export default async function addData(
	collectionName: string,
	data: any,
) {
	try {
		const newCollection = await addDoc(
			collection(db, collectionName),
			data,
		);
		console.log(newCollection);
		return newCollection;
	} catch (e: any) {
		throw new Error(
			'Something went wrong, please try again later',
		);
	}
}
