import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './auth/auth';
import ProfileReducer from './auth/profile';
import CategoriesReducer from './store/category';
import ProductsReducer from './store/product';

export const store = configureStore({
	reducer: {
		user: UserReducer,
		profile: ProfileReducer,
		categories: CategoriesReducer,
		products: ProductsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
