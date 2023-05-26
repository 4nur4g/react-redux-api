import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axios from 'axios';

// Define a type for the slice state
export interface usersState {
  users: any[];
  status: string;
  error: string | null;
}

const USERS_URL = 'https://reqres.in/api/users?page=1&per_page=5';
export const fetchPosts = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(USERS_URL);
  return response.data;
});

const initialState: usersState = {
  users: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = state.users.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      });
  },
});

export const {} = usersSlice.actions;

export const selectUsers = (state: RootState) => state.user.users;
export const selectAllUsers = (state: RootState) => state.user.users;
export const getPostsStatus = (state: RootState) => state.user.status;
export const getPostsError = (state: RootState) => state.user.error;

export default usersSlice.reducer;
