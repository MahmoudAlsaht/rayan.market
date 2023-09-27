import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookies = (name: string, data: any) => {
	cookies.set(name, data, {
		path: '/',
		maxAge: 1000 * 60 * 24,
	});
};

export const getCookies = (name: string) => {
	return cookies.get(name);
};

export const removeCookies = (name: string) => {
	cookies.remove(name, { path: '/' });
};
