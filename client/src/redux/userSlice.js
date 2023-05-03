import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state,action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginError: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state)=>{
            return initialState;
        },
        subscribe: (state,action) =>{
            if(!state.currentUser.subscribedUsers.includes(action.payload)) {
                state.currentUser.subscribedUsers.push(action.payload);
            }
            else {
                state.currentUser.subscribedUsers.splice(state.currentUser.subscribedUsers.findIndex((userID) => userID === action.payload),1);
            }
        }
    }
})

export const {loginStart, loginSuccess, loginError, logout, subscribe} = userSlice.actions;

export default userSlice.reducer;