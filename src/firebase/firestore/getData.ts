import db from '../config';
import { collection, getDocs } from 'firebase/firestore';

export default async function getData(collectionName: string) {
	try {
		const docRef = await collection(db, collectionName);
		const docSnap = await getDocs(docRef);

		return docSnap;
	} catch (e: any) {
		console.log(e);
	}
}
