import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    selang: [],
    selangById: {},
    isLoading: false,
    isError: null
};

export const selangSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSelang: (state, action) => {
            state.selang = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.isError = action.payload
        },
        setSelangById: (state, action) => {
            state.selangById = action.payload
        }
    }
});

export const { setSelang, setLoading, setError, setSelangById } = selangSlice.actions;

export default selangSlice.reducer;
