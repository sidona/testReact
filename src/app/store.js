import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/actions';
import cardReducer from '../components/Card/actions';
import addPostReducer from '../features/AddPost/actions';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    cardCustom: cardReducer,
    addPost: addPostReducer,
  },
});
