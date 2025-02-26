import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice"
import postReducer from "./post/postSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer
    }
})

export default store;