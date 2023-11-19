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

		return {
			data: querySnapshot?.docs[0]?.data(),
			docId: querySnapshot?.docs[0]?.id,
		} as DocType;
	} catch (e: any) {
		console.log(e.message);
		throw new Error(
			'Something went wrong, please try again later',
		);
	}
}
