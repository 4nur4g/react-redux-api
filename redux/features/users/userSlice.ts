import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axios from 'axios';
import { HYDRATE } from 'next-redux-wrapper';

const hydrate = createAction<usersState>(HYDRATE);
// Define a type for the slice state
export interface usersState {
  users: User[];
  status: string;
  error: string | null;
  availablePageData: number[];
  dataLimit: { pages: number | null; limit: number | null };
}

const USERS_URL = 'https://reqres.in/api/users';
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number = 1) => {
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
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.dataLimit.pages === null) {
          state.dataLimit = {
            pages: action.payload.total_pages,
            limit: action.payload.total,
          };
        }
        state.users = state.users.concat(action.payload.data);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      })
      .addCase(hydrate, (state, action) => {
        console.log('HYDRATE users', action.payload);
        return {
          ...state,
          ...action.payload.users,
        };
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
