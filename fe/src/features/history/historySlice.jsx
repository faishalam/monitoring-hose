import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    history: [],
    isLoading: false
};

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setHistory: (state, action) => {
            state.selang = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
     
     
    }
});

export const { setHistory, setLoading } = historySlice.actions;

export default historySlice.reducer;
