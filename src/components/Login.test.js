import React from "react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { signInUser } from "../redux/auth/authSlice";
import postReducer from "../redux/post/postSlice"
import Login from "./Login";


jest.mock("../redux/auth/authSlice", () => ({
    ...jest.requireActual("../redux/auth/authSlice"),
    signInUser: jest.fn(() => ({ type: "auth/signInUser" })),
}));


jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
}));

const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer
    },
});

describe("Login Component", () => {
    it("submits the form with email and password", () => {
        const mockDispatch = jest.fn();
        require("react-redux").useDispatch.mockReturnValue(mockDispatch);
        mockDispatch.mockClear();

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </Provider>
        );

        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        const submitButton = screen.getByText("SignIn");

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(submitButton);


        expect(mockDispatch).toHaveBeenCalledWith(signInUser({ email: "test@example.com", password: "password123" }));
    });
});
