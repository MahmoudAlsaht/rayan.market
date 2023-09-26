import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { fetchUser } from '../../controllers/user';
import { User } from 'firebase/auth';

// Define a type for the slice state

// Define the initial state using that type
const initialState: Partial<User> | null = null;

export const UserSlice = createSlice({
	name: 'user',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state = action.payload;
			return state;
		});
	},
});

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default UserSlice.reducer;
