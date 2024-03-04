import { createTheme, styled } from '@mui/material';
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
		secondary: {
			main: '#555555',
		},
		error: {
			main: '#ff5555',
		},
		warning: {
			main: '#bb9900',
		},
	},
});

export const cacheRtl = createCache({
	key: 'muirtl',
	stylisPlugins: [prefixer, rtlPlugin],
});

export const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});
