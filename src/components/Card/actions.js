import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchData} from "../../utils/fetchData";

const initialState = {
    user: {},
    comments: [],
    loading: false,
};
export const fetchUsers = createAsyncThunk(
    'card/user',
    async (userId) => {
        const response = await fetchData(`https://jsonplaceholder.typicode.com/users/${userId}`);
        return response;
    }
);
export const fetchComment = createAsyncThunk(
    'card/comment',
    async (postId) => {
        const response = await fetchData(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        return response;
    }
);

export const cardCustomSlice = createSlice({
    name: 'cardCustom',
    initialState,
    reducers: {
        user: (state, action) => {
            return {
                ...state,
                user: action.payload,
            }
        },
        comments: (state, action) => {
            return {
                ...state,
                comments: action.payload,
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            });
    },
});

export const { comments, user } = cardCustomSlice.actions;
export const selectCard = (state) => state.cardCustom;

export default cardCustomSlice.reducer;
