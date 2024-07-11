import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userLogin: null,
    isLoggedIn: false,
    mySelang: null,
    isLoading: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLogin: (state, action) => {
            state.userLogin = action.payload;
            state.isLoggedIn = true;
        },
        setUserLogout: (state) => {
            state.userLogin = null;
            state.isLoggedIn = false;
            state.mySelang = null
        },
        setMySelang: (state, action) => {
            state.mySelang = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
});

export const { setUserLogin, setUserLogout, setMySelang, setLoading } = userSlice.actions;

export default userSlice.reducer;
