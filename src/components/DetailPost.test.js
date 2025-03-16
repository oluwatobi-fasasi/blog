import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import postReducer, { fetchPostById, deletePost } from "../redux/post/postSlice";
import DetailPost from "./DetailPost";
import { supabase } from "../supabase";
import "@testing-library/jest-dom";


jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
    useParams: jest.fn(),
    Link: ({ children, to }) => <a href={to}>{children}</a>,
}));


jest.mock("../supabase", () => ({
    supabase: {
        auth: {
            getUser: jest.fn(),
        },
    },
}));

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();
const mockPost = {
    id: "1",
    title: "Test Post",
    post: "This is a test post",
    user_id: "123",
};

describe("DetailPost Component", () => {
    beforeEach(() => {
        require("react-redux").useDispatch.mockReturnValue(mockDispatch);
        require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
        require("react-router-dom").useParams.mockReturnValue({ id: "1" });
        require("react-redux").useSelector.mockImplementation((selector) =>
            selector({ posts: { post: mockPost } })
        );

        supabase.auth.getUser.mockResolvedValue({
            data: { user: { id: "123" } },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the post details", async () => {
        await act(async () => {
            render(
                <Provider store={configureStore({ reducer: { posts: postReducer } })}>
                    <MemoryRouter>
                        <DetailPost />
                    </MemoryRouter>
                </Provider>
            );
        });

        expect(screen.getByText("Test Post")).toBeInTheDocument();
        expect(screen.getByText("This is a test post")).toBeInTheDocument();
        expect(screen.getByText("Homepage")).toBeInTheDocument();
    });

    it("shows edit and delete buttons if the user is the author", async () => {
        await act(async () => {
            render(
                <Provider store={configureStore({ reducer: { posts: postReducer } })}>
                    <MemoryRouter>
                        <DetailPost />
                    </MemoryRouter>
                </Provider>
            );
        });

        await waitFor(() => {
            expect(screen.getByText("Edit")).toBeInTheDocument();
            expect(screen.getByText("Delete")).toBeInTheDocument();
        });
    });


});
