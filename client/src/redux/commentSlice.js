import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentComments: null,
    loading: false,
    error: false
}

export const commentSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        commentStart: (state) => {
            state.loading = true;
        },
        commentSuccess: (state,action) => {
            state.loading = false;
            state.currentComments = action.payload;
        },
        commentError: (state) => {
            state.loading = false;
            state.error = true;
        },
        commentErase: (state)=>{
            return initialState;
        }
    }
})

export const { commentStart, commentSuccess, commentError, commentErase } = commentSlice.actions;

export default commentSlice.reducer;