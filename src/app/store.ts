import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './auth/auth';
import ProfileReducer from './auth/profile';
import CategoriesReducer from './store/category';
import BrandsReducer from './store/brand';
import ProductsReducer from './store/product';
import CartReducer from './store/cart';
import OrderReducer from './store/order';
import BannerReducer from './store/banner';
import PromoReducer from './store/promo';

export const store = configureStore({
	reducer: {
		user: UserReducer,
		profile: ProfileReducer,
		categories: CategoriesReducer,
		products: ProductsReducer,
		cart: CartReducer,
		orders: OrderReducer,
		banners: BannerReducer,
		brands: BrandsReducer,
		promos: PromoReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
