import Cookies from 'universal-cookie';
import { TCartProduct } from '../app/store/cart';
import { TUser } from '../app/auth/auth';
import axios from 'axios';
import { TProduct } from '../app/store/product';
import { TBrand } from '../app/store/brand';
import { TCategory } from '../app/store/category';

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
	return str?.replace(/[.@&*+?^${}()|[\]\\]/g, ''); // $& means the whole matched string
}

export const sortProductsBasedOnPrice = (
	products: (TProduct | null)[],
	action: string,
) => {
	let sortedProducts: (TProduct | null)[] = [];
	if (action === 'highest') {
		sortedProducts = products?.toSorted(
			(a, b) =>
				parseFloat(b?.newPrice || (b?.price as string)) -
				parseFloat(a?.newPrice || (a?.price as string)),
		);
	} else if (action === 'lowest') {
		sortedProducts = products?.toSorted(
			(a, b) =>
				parseFloat(a?.newPrice || (a?.price as string)) -
				parseFloat(b?.newPrice || (b?.price as string)),
		);
	} else sortedProducts = products;

	return sortedProducts;
};

export const filterProducts = (
	products: (TProduct | null)[],
	brands: (TBrand | null)[],
	categories: (TCategory | null)[],
	query: string,
) => {
	if (query === '' || query == null) return products;
	const filteredData: (TProduct | null)[] = [];

	for (const product of products) {
		if (
			product?.name
				?.toLowerCase()
				.includes(escapeRegExp(query?.toLowerCase()))
		)
			filteredData.push(product);
	}

	for (const category of categories) {
		if (
			category?.name
				?.toLowerCase()
				.includes(escapeRegExp(query?.toLowerCase()))
		)
			filteredData.push(...category.products);
	}
	for (const brand of brands) {
		if (
			brand?.name
				?.toLowerCase()
				.includes(escapeRegExp(query?.toLowerCase()))
		)
			filteredData.push(...brand.products);
	}

	return filteredData;
};

export const filterData = (products: any[], query: string) => {
	return products?.filter((data) => {
		return (
			data?.name
				?.toLowerCase()
				.includes(escapeRegExp(query?.toLowerCase())) ||
			data?.optionName
				?.toLowerCase()
				.includes(escapeRegExp(query?.toLowerCase())) ||
			data?.username
				?.toLowerCase()
				.includes(escapeRegExp(query?.toLowerCase()))
		);
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

export const isAuthenticated = (user: TUser | null) => {
	return user && user?.username !== 'anonymous';
};

export const isAdmin = async (user: TUser | null) => {
	return !isAuthenticated(user)
		? false
		: user?.role === 'admin';
};

export const isStaff = async (user: TUser | null) => {
	return !isAuthenticated(user)
		? false
		: user?.role === 'staff';
};
export const isCustomer = async (user: TUser | null) => {
	return !isAuthenticated(user)
		? false
		: user?.role === 'customer';
};

export const sendRequestToServer = async (
	method: string,
	urlStr: string,
	data?: any,
) => {
	try {
		const token = getCookies('token');
		const url = `${import.meta.env.VITE_API_URL}/${urlStr}`;
		const res = await axios({
			url,
			data,
			method,
			headers: {
				Accept: 'application/json',
				'Access-Control-Allow-Origin': '*',
				Authorization: `Bearer ${token}`,
			},
		});
		return res?.data;
	} catch (e: any) {
		throw new Error(e?.response?.data?.error);
	}
};

export const checkPhoneValidity = async (phonNumber: string) => {
	try {
		const options = {
			method: 'GET',
			url: 'https://phonenumbervalidatefree.p.rapidapi.com/ts_PhoneNumberValidateTest.jsp',
			params: {
				number: `+962${phonNumber.slice(0)}`,
				country: 'JO',
			},
			headers: {
				'X-RapidAPI-Key':
					'a0ef5d47bfmsh89627da1cf24512p137ad9jsn7ba4dcd07d38',
				'X-RapidAPI-Host':
					'phonenumbervalidatefree.p.rapidapi.com',
			},
		};
		const response = await axios.request(options);
		return response?.data?.isValidNumber as boolean;
	} catch (e: any) {
		throw new Error('something went wrong');
	}
};
