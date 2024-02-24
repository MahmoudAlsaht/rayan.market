import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from './Router.tsx';
import { RouterProvider } from 'react-router-dom';
import './main.css';
import 'react-loading-skeleton/dist/skeleton.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import { registerSW } from 'virtual:pwa-register'

// const updateSW = registerSW({
// 	onNeedRefresh() {},
// 	onOfflineReady() {},
//   })

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={Router} />
	</React.StrictMode>,
);
