import { configureStore } from '@reduxjs/toolkit'
import selangSlice from './features/selang/selangSlice'
import userSlice from './features/user/userSlice'
import historySlice from './features/history/historySlice'


export default configureStore({
    reducer: {
        userStore: userSlice,
        selangStore: selangSlice,
        historyStore: historySlice
    }
})