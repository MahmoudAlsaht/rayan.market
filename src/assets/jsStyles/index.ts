import { createTheme } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';

export const theme = createTheme({
	direction: 'rtl',
	palette: {
		primary: {
			main: '#07a180',
			light: '#07a18033',
		},
		error: {
			main: '#ff5555',
		},
	},
});

export const cacheRtl = createCache({
	key: 'muirtl',
	stylisPlugins: [prefixer, rtlPlugin],
});
