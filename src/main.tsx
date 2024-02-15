import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from './Router.tsx';
import { RouterProvider } from 'react-router-dom';
import './main.css';

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
