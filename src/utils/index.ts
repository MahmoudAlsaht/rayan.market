import Cookies from 'universal-cookie';
import { TCartProduct } from '../app/store/cart';
import { TUser } from '../app/auth/auth';
import axios from 'axios';

const cookies = new Cookies();

export const setCookies = (
	name: string,
	data: any,
	expireDate: number = 1,
) => {
	if (expireDate > 0) {
		const date = new Date();
		date.setTime(
			date.getTime() + 1000 * 60 * 60 * 24 * expireDate,
		);
		cookies.set(name, data, {
			path: '/',
			expires: date,
		});
	} else {
		cookies.set(name, data, {
			path: '/',
		});
	}
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
	const days = diff / (1000 * 3600 * 24);
	return days < 7;
};

export function escapeRegExp(str: string) {
	return str.replace(/[.@&*+?^${}()|[\]\\]/g, ''); // $& means the whole matched string
}

export const filterData = (products: any[], query: string) => {
	return products?.filter((data) => {
		return data?.name
			.toLowerCase()
			.includes(escapeRegExp(query?.toLowerCase()));
	});
};

export const sumTotalPrice = (products: TCartProduct[]) => {
	let totalPrice = 0;
	for (const product of products) {
		if (product.counter > 1) {
			totalPrice +=
				product?.counter *
				parseFloat(product?.price as string);
		} else if (product.counter === 1) {
			totalPrice += parseFloat(product?.price as string);
		}
	}
	return totalPrice;
};

export const sumEachProductTotalPrice = (
	product: TCartProduct,
) => {
	return (
		product?.counter * parseFloat(product?.price as string)
	);
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

export const sendRequestToServer = async (
	method: string,
	urlStr: string,
	data?: any,
	contentType: string = 'application/json',
) => {
	try {
		const url = `${import.meta.env.VITE_API_URL}/${urlStr}`;
		const res = await axios({
			url,
			data,
			method,
			headers: {
				Accept: contentType,
				'Content-Type': contentType,
				'Access-Control-Allow-Origin': '*',
			},
		});
		return res?.data;
	} catch (e: any) {
		console.error(e);
		throw new Error(e?.response?.data?.error);
	}
};
