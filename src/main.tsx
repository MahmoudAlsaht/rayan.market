import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from './Router.tsx';
import { RouterProvider } from 'react-router-dom';
import './main.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={Router} />
	</React.StrictMode>,
);
