import { configureStore } from "@reduxjs/toolkit"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import authReducer from "./redux/auth/authSlice"
import postReducer from "./redux/post/postSlice"
import React from "react"
import App from "./App"
import { MemoryRouter } from "react-router-dom"
import "@testing-library/jest-dom";


const mockStore = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer,
    },
});


test("if app rendered correctly", () => {
    render(
        <Provider store={mockStore}>

            <App />

        </Provider>
    )

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Create/i)).toBeInTheDocument();

})