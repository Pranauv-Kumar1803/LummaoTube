import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentVideo: null,
    loading: false,
    error: false
}

export const videoSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state,action) => {
            state.loading = false;
            state.currentVideo = action.payload;
        },
        fetchError: (state) => {
            state.loading = false;
            state.error = true;
        },
        like: (state,action)=>{
            if(!state.currentVideo.likes.includes(action.payload)) {
                state.currentVideo.likes.push(action.payload);
                state.currentVideo.dislikes.splice(state.currentVideo.dislikes.findIndex((userID) => userID === action.payload),1);
            }
        },
        dislike: (state,action)=>{
            if(!state.currentVideo.dislikes.includes(action.payload)) {
                state.currentVideo.dislikes.push(action.payload);
                state.currentVideo.likes.splice(state.currentVideo.likes.findIndex((userID) => userID === action.payload),1);
            }
        }
    }
})

export const { fetchStart, fetchSuccess, fetchError, like, dislike } = videoSlice.actions;

export default videoSlice.reducer;