import { SpeedInsights } from '@vercel/speed-insights/next';
import { CacheProvider } from '@emotion/react';
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
import EditUser from './routes/account/EditUser';
import ResetPassword from './routes/ResetPassword';
import NotFound404 from './routes/NotFound404';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './routes/dashboard/Dashboard';
import CategoriesSettings from './routes/dashboard/CategoriesActions';
import ProductsSettings from './routes/dashboard/ProductsActions';
import ShowProduct from './routes/store/ShowProduct';
import OrderSettings from './routes/dashboard/OrderSettings';
import ContactInfo from './routes/account/ContactInfo';
import ShowContactInfo from './routes/account/ShowContactInfo';
import AddNewContact from './routes/account/AddNewContact';
import Checkout from './routes/checkout/Checkout';
import CartCheckout from './routes/checkout/CartCheckout';
import ShowOrder from './routes/dashboard/ShowOrder';
import OrderHistoryList from './routes/account/OrderHistoryList';
import ShowOrderDetails from './routes/account/ShowOrderDetails';
import LandingPage from './routes/LandingPage';
import BannerSettings from './routes/dashboard/BannersActions';
import Offers from './routes/store/Offers';
import CheckoutLayout from './layouts/CheckoutLayout';
import Category from './routes/store/Category';
import InstallPWA from './components/InstallButton';
import Products from './routes/store/Products';
import Categories from './routes/store/Categories';
import Brands from './routes/store/Brands';
import ShowBrand from './routes/store/ShowBrand';
import BrandsActions from './routes/dashboard/BrandsActions';
import { ThemeProvider } from '@mui/material';
import { cacheRtl, theme } from './assets/styles';
import MobileSearch from './components/mobileComponents/MobileSearch';
import MobileOptions from './components/mobileComponents/MobileOptions';
import EditAdmin from './routes/dashboard/EditAdmin';
import UsersActions from './routes/dashboard/UsersActions';
import PromosActions from './routes/dashboard/PromosActions';
import DistrictsActions from './routes/dashboard/DistrictsActions';
import TopViews from './routes/store/TopViews';
import TopPurchases from './routes/store/TopPurchases';

export const Router = createBrowserRouter([
	{
		element: <Wrapper />,
		children: [
			{ path: '/', element: <LandingPage /> },
			{
				path: '/',
				element: <RootLayout />,
				children: [
					{ path: 'home', element: <Home /> },
					{
						path: 'user-options',
						element: <MobileOptions />,
					},
					{
						path: 'search',
						element: <MobileSearch />,
					},
					{
						path: 'categories',
						element: <Categories />,
					},
					{
						path: 'categories/:categoryId',
						element: <Category />,
					},
					{
						path: 'brands',
						element: <Brands />,
					},
					{
						path: 'brands/:brandId',
						element: <ShowBrand />,
					},
					{ path: 'products', element: <Products /> },
					{
						path: 'products/top-views',
						element: <TopViews />,
					},
					{
						path: 'products/top-purchases',
						element: <TopPurchases />,
					},
					{
						path: 'products/:productId',
						element: <ShowProduct />,
					},
					{ path: 'offers', element: <Offers /> },
				],
			},

			{
				element: <CheckoutLayout />,
				children: [
					{ path: 'cart', element: <CartCheckout /> },
					{
						path: 'checkout',
						element: <Checkout />,
					},
				],
			},
			{
				element: <AuthLayout />,
				path: 'auth',
				children: [
					{ path: 'signup', element: <Signup /> },
					{ path: 'signin', element: <SignIn /> },
					{
						path: 'reset-password',
						element: <ResetPassword />,
					},
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
					{
						path: 'profile/:profileId/account-setting',
						element: <EditUser />,
					},
					{
						path: 'profile/:profileId/contact-info',
						element: <ContactInfo />,
					},
					{
						path: 'profile/:profileId/contact-info/:contactId',
						element: <ShowContactInfo />,
					},
					{
						path: 'profile/:profileId/contact-info/new-contact',
						element: <AddNewContact />,
					},
					{
						path: 'profile/:profileId/orders-history',
						element: <OrderHistoryList />,
					},
					{
						path: 'profile/:profileId/orders-history/:orderId',
						element: <ShowOrderDetails />,
					},
				],
			},
			{
				element: <DashboardLayout />,
				path: 'dashboard',
				children: [
					{
						path: 'admin/:adminId',
						element: <Dashboard />,
					},
					{
						path: 'admin/:adminId/account-settings',
						element: <EditAdmin />,
					},
					{
						path: 'settings/users',
						element: <UsersActions />,
					},
					{
						path: 'settings/districts',
						element: <DistrictsActions />,
					},
					{
						path: 'settings/categories',
						element: <CategoriesSettings />,
					},
					{
						path: 'settings/brands',
						element: <BrandsActions />,
					},
					{
						path: 'settings/promos',
						element: <PromosActions />,
					},
					{
						path: 'settings/products',
						element: <ProductsSettings />,
					},
					{
						path: 'settings/orders',
						element: <OrderSettings />,
					},
					{
						path: 'settings/orders/:orderId',
						element: <ShowOrder />,
					},
					{
						path: 'settings/banners',
						element: <BannerSettings />,
					},
				],
			},
			{
				path: '*',
				element: <NotFound404 />,
			},
		],
	},
]);

function Wrapper() {
	return (
		<Provider store={store}>
			<CacheProvider value={cacheRtl}>
				<ThemeProvider theme={theme}>
					<div
						style={{
							maxWidth: '1411px',
							margin: '0 auto',
						}}
					>
						<InstallPWA />
						<Outlet />
						<SpeedInsights />
					</div>
				</ThemeProvider>
			</CacheProvider>
		</Provider>
	);
}
