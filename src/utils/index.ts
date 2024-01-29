import { DocumentData } from 'firebase/firestore';
import Cookies from 'universal-cookie';
import { TCartProduct } from '../app/store/cart';
import { TProduct } from '../app/store/product';
import { TUser } from '../app/auth/auth';

const cookies = new Cookies();

export const setCookies = (
	name: string,
	data: any,
	expireDate: number = 1,
) => {
	const date = new Date();
	date.setTime(
		date.getTime() + 1000 * 60 * 60 * 24 * expireDate,
	);
	cookies.set(name, data, {
		path: '/',
		expires: date,
	});
};

export const getCookies = (name: string) => {
	return cookies.get(name);
};

export const removeCookies = (name: string) => {
	cookies.remove(name, { path: '/' });
};

export const checkIfDocIsNew = (createdAt: number) => {
	const todyDate = Date.now();
	const diff = todyDate - createdAt;
	const days = diff / (1000 * 60 * 60 * 24);
	return days < 7;
};

export function escapeRegExp(str: string) {
	return str.replace(/[.@&*+?^${}()|[\]\\]/g, ''); // $& means the whole matched string
}

export const filteredData = (
	dataArray: DocumentData[],
	query: string,
) => {
	return dataArray?.filter((data) => {
		return data.name
			.toLowerCase()
			.includes(escapeRegExp(query?.toLocaleLowerCase()));
	});
};

export const sumTotalPrice = (products: TCartProduct[]) => {
	let totalPrice = 0;
	for (const product of products) {
		if (product.counter > 1) {
			totalPrice +=
				product?.counter *
				parseInt(product?.price as string);
		} else if (product.counter === 1) {
			totalPrice += parseInt(product?.price as string);
		}
	}
	return totalPrice;
};

export const sumEachProductTotalPrice = (
	product: TCartProduct,
) => {
	return product?.counter * parseInt(product?.price as string);
};

export const sortProductsBasedOnPrice = (
	products: TProduct[],
	orderingType: string,
) => {
	if (orderingType === 'highest') {
		return products?.sort(
			(a, b) => parseInt(b.price) - parseInt(a.price),
		);
	} else if (orderingType === 'lowest') {
		return products?.sort(
			(a, b) => parseInt(a.price) - parseInt(b.price),
		);
	} else return products;
};

export const isAuthenticated = () => {
	const user: TUser | null = getCookies('user');
	return user && user?.username !== 'anonymous';
};

export const isAdmin = () => {
	if (!isAuthenticated()) return false;
	const user: TUser | null = getCookies('user');
	return user?.isAdmin;
};
