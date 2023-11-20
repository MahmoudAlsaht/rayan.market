import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookies = (name: string, data: any) => {
	cookies.set(name, data, {
		path: '/',
		sameSite: 'none',
		maxAge: 1000 * 60 * 24,
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
