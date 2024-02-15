/* eslint-disable no-mixed-spaces-and-tabs */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/',
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: [
				'favicon.ico',
				'apple-touch-icon.png',
				'masked-icon.svg',
			],
			manifest: {
				name: 'mStore',
				short_name: 'mStore',
				description: 'Demo E-commerc app',
				theme_color: '#60F7C2',
				start_url: '/',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
			},
			workbox: {
				cleanupOutdatedCaches: false,
			},
		}),
	],
});
