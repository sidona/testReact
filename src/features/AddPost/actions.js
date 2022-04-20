import {createAction, createSlice} from '@reduxjs/toolkit';

const initialState = {
    isOpenModalAdd: false,
};

export const openModal = createAction('posts/modal')


export const addPostSlice = createSlice({
    name: 'addPost',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        isOpenModalAdd: (state, action) => {
            return {
                ...state,
                isOpenModalAdd: action.payload,
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(openModal, (state, action) => {
                state.isOpenModalAdd = action.payload;
            });
    },
});

export const { isOpenModalAdd } = addPostSlice.actions;

export const selectAddPost = (state) => state.addPost;

export default addPostSlice.reducer;
