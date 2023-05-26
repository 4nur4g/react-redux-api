import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

// Define a type for the slice state
export interface usersState {
  users: any[];
  status: string;
  error: string | null;
}

const USERS_URL = 'https://reqres.in/api/users';
export const fetchPosts = createAsyncThunk(
  'users/fetchUsers',
  async (page: number = 1) => {
    // Use the page parameter to construct the URL
    const response = await axios.get(`${USERS_URL}?page=${page}&per_page=5`);
    return response.data.data;
  }
);

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
        state.users = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      });
  },
});

export const {} = usersSlice.actions;

export const selectAllUsers = (state: RootState) => state.user.users;
export const getUsersStatus = (state: RootState) => state.user.status;
export const getUsersError = (state: RootState) => state.user.error;

export default usersSlice.reducer;
