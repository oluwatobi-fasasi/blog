import React from "react";
import "@testing-library/jest-dom";

import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { supabase } from "../supabase";
import Dashboard from "./Dashboard";
import { logoutUser, authReducer } from "../redux/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";

jest.mock("../supabase", () => ({
    supabase: {
        from: jest.fn().mockReturnValue({
            select: jest.fn().mockResolvedValue({ data: [] }),
        }),
        auth: {
            signOut: jest.fn().mockResolvedValue({ error: null }),
        },
    },
}));


jest.mock("../redux/auth/authSlice", () => ({
    logoutUser: jest.fn(),
}));

const createMockStore = (preloadedState) =>
    configureStore({
        reducer: {
            auth: authReducer,
        },
        preloadedState,
    });


describe("Dashboard Component", () => {
    let store;
    beforeEach(() => {
        store = createMockStore({
            auth: {
                session: { user: { id: "123" } },
                user: { id: "123", email: "test@example.com" },
                loading: false,
                error: null,
            },
        });

        store.dispatch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the dashboard with correct elements", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Dashboard />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText("Your Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Create your post")).toBeInTheDocument();
        expect(screen.getByText("Homepage")).toBeInTheDocument();
        expect(screen.getByText("Sign Out")).toBeInTheDocument();
    });



    it("shows a message when no posts are found", async () => {
        supabase.from.mockReturnValueOnce({
            select: jest.fn().mockResolvedValue({ data: [] }),
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Dashboard />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() =>
            expect(screen.getByText("You haven't created any posts yet.")).toBeInTheDocument()
        );
    });

    it("logs out the user and navigates to homepage", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Dashboard />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText("Sign Out"));

        await waitFor(() => expect(store.dispatch).toHaveBeenCalledWith(logoutUser()));
    });
});
