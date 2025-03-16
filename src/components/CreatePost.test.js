import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { supabase } from "../supabase";
import CreatePost from "./CreatePost";
import "@testing-library/jest-dom";


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

jest.mock("../supabase", () => ({
    supabase: {
        auth: {
            getUser: jest.fn(),
        },
        from: jest.fn(() => ({
            insert: jest.fn(() => ({
                select: jest.fn().mockResolvedValue({}),
            })),
        })),
    },
}));

const mockNavigate = jest.fn();

describe("CreatePost Component", () => {
    beforeEach(() => {
        require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
        supabase.auth.getUser.mockResolvedValue({
            data: { user: { id: "123" } },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the form fields", () => {
        render(
            <MemoryRouter>
                <CreatePost />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText("Your Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Your Title")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Write Here.......")).toBeInTheDocument();
        expect(screen.getByText("Create Post")).toBeInTheDocument();
    });

    it("submits the form and navigates to homepage", async () => {
        render(
            <MemoryRouter>
                <CreatePost />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Your Name"), {
            target: { value: "John Doe" },
        });
        fireEvent.change(screen.getByPlaceholderText("Your Title"), {
            target: { value: "My First Post" },
        });
        fireEvent.change(screen.getByPlaceholderText("Write Here......."), {
            target: { value: "This is a sample blog post." },
        });

        await act(async () => {
            fireEvent.click(screen.getByText("Create Post"));
        });

        await waitFor(() => expect(supabase.from).toHaveBeenCalledWith("blog_posts"));
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});
