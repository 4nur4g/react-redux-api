import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@/redux/features/users/userSlice';
import { createWrapper } from 'next-redux-wrapper';
// ...

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` models from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(() => store);
