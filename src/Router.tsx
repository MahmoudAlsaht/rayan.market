import { createBrowserRouter, Outlet } from 'react-router-dom';
import Home from './routes/Home';
import RootLayout from './layouts/RootLayout';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AuthLayout from './layouts/AuthLayout';
import Signup from './routes/Signup';
import SignIn from './routes/Signin';
import AccountLayout from './layouts/AccountLayout';
import Profile from './routes/account/Profile';

export const Router = createBrowserRouter([
	{
		element: <Wrapper />,
		children: [
			{
				element: <RootLayout />,
				children: [
					{ path: '/', element: <Home /> },
					{ path: 'about', element: <h1>About</h1> },
				],
			},
			{
				element: <AuthLayout />,
				path: 'auth',
				children: [
					{ path: 'signup', element: <Signup /> },
					{ path: 'signin', element: <SignIn /> },
				],
			},
			{
				element: <AccountLayout />,
				path: 'account',
				children: [
					{
						path: 'profile/:profileId',
						element: <Profile />,
					},
				],
			},
		],
	},
]);

function Wrapper() {
	return (
		<Provider store={store}>
			<Outlet />
		</Provider>
	);
}
