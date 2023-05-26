import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axios from 'axios';

// Define a type for the slice state
export interface usersState {
  users: User[];
  status: string;
  error: string | null;
  availablePageData: number[];
  dataLimit: { pages: number | null; limit: number | null };
}

const USERS_URL = 'https://reqres.in/api/users';
export const fetchPosts = createAsyncThunk(
  'users/fetchUsers',
  async (page: number = 1) => {
    // Use the page parameter to construct the URL
    const response = await axios.get(`${USERS_URL}?page=${page}&per_page=5`);
    return response.data as ApiResponse;
  }
);

const initialState: usersState = {
  users: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  availablePageData: [],
  dataLimit: { pages: null, limit: null },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    pageDataAdded: (state, action: PayloadAction<number>) => {
      state.availablePageData.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.dataLimit.pages === null) {
          state.dataLimit = {
            pages: action.payload.total_pages,
            limit: action.payload.total,
          };
        }
        state.users = state.users.concat(action.payload.data);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      });
  },
});

export const { pageDataAdded } = usersSlice.actions;

export const selectAllUsers = (state: RootState) => state.user.users;
export const getUsersStatus = (state: RootState) => state.user.status;
export const getUsersError = (state: RootState) => state.user.error;
export const getAvailablePageData = (state: RootState) =>
  state.user.availablePageData;
export const getDataLimit = (state: RootState) => state.user.dataLimit;

export default usersSlice.reducer;
