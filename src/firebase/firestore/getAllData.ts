import {
	collection,
	getDocs,
	orderBy,
	query,
} from 'firebase/firestore';
import db from '../config';

export const getAllData = async (collectionName: string) => {
	try {
		const data = await query(
			collection(db, collectionName),
			orderBy('createdAt'),
		);
		const dataSnapshot = await getDocs(data);
		const dataList = dataSnapshot.docs.map((doc) =>
			doc.data(),
		);

		return dataList;
	} catch (e: any) {
		console.log(e);
	}
};
