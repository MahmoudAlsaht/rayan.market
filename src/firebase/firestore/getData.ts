import db from '../config';
import {
	DocumentData,
	collection,
	getDocs,
	query,
	where,
} from 'firebase/firestore';

export type DocType = {
	data: DocumentData | undefined;
	docId: string | undefined;
};

export default async function getData(
	collectionName: string,
	filed: string,
	querySearch: string,
) {
	try {
		const q = query(
			collection(db, collectionName),
			where(filed, '==', querySearch),
		);
		const querySnapshot = await getDocs(q);

		// const docSnap = querySnapshot.forEach((doc) => {
		// 	// doc.data() is never undefined for query doc snapshots
		// 	console.log(doc.id, " => ", doc.data());
		// });

		return {
			data: querySnapshot?.docs[0]?.data(),
			docId: querySnapshot?.docs[0]?.id,
		} as DocType;
	} catch (e: any) {
		console.log(e);
	}
}
