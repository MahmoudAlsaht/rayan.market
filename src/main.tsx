import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from './Router.tsx';
import { RouterProvider } from 'react-router-dom';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={Router} />
	</React.StrictMode>,
);
