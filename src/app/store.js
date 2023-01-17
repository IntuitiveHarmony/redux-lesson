import { configureStore } from "@reduxjs/toolkit"
import counterReducer from '../features/counter/counterSlice'  // 1.

export const store = configureStore({
    reducer: {
        counter: counterReducer,  //2
    }
})