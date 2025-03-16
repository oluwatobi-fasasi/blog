import React from "react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { signUpNewUsers } from "../redux/auth/authSlice";
import postReducer from "../redux/post/postSlice"
import Signup from "./Signup";




jest.mock("../redux/auth/authSlice", () => ({
    ...jest.requireActual("../redux/auth/authSlice"),
    signUpNewUsers: jest.fn(() => ({ type: "auth/signUpNewUsers" }))
}))


jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
}))


const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer
    },
});

describe("Signup Component", () => {
    it("submit form with email, password, and firstname", () => {
        const mockDispatch = jest.fn()
        require("react-redux").useDispatch.mockReturnValue(mockDispatch);
        mockDispatch.mockClear();

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Signup />
                </MemoryRouter>
            </Provider>
        )
        const firstNameInput = screen.getByPlaceholderText("First_Name");
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        const submitButton = screen.getByText("SignUp");

        fireEvent.change(firstNameInput, { target: { value: "donard" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(submitButton);

        expect(mockDispatch).toHaveBeenCalledWith(signUpNewUsers({ firstname: "donard", email: "test@example.com", password: "password123" }));
    })
})