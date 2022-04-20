import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchData, postData} from "../../utils/fetchData";

const initialState = {
    posts: [],
    loading: false,
};

export const fetchPosts = createAsyncThunk(
    'post/getAll',
    async (amount) => {
        const response = await fetchData('https://jsonplaceholder.typicode.com/posts');
        // The value we return becomes the `fulfilled` action payload
        return response;
    }
);
export const addPost = createAsyncThunk(
    'post/add',
    async (payload) => {
        const response = await postData('https://jsonplaceholder.typicode.com/posts', payload);
        return response;
    }
);


export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        posts: (state, action) => {
            return {
                ...state,
                posts: action.payload,
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
    },
});

export const { posts } = postSlice.actions;

export const selectPost = (state) => state.posts;

export default postSlice.reducer;
