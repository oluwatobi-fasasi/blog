import { supabase } from "@/supabase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


//  Check for an active session when the app loads
export const checkSession = createAsyncThunk("auth/checkSession", async (_, { rejectWithValue }) => {
    try {
        const { data } = await supabase.auth.getSession();
        return data.session;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});



export const signUpNewUsers = createAsyncThunk(
    "auth/signUpNewUsers",
    async ({ email, password, first_name }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { first_name },
                },
            });
            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const signInUser = createAsyncThunk(
    "auth/signInUser", async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

//  Async thunk for logging out users
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return null; // No user after logout
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState = {
    user: null,
    session: null,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUpNewUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUpNewUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signUpNewUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signInUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(checkSession.fulfilled, (state, action) => {
                state.session = action.payload;
                state.user = action.payload?.user || null;
            })
            .addCase(checkSession.rejected, (state, action) => {
                state.session = null;
                state.user = null;
                state.error = action.payload;
            })
            // ✅ Logout cases
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
})


export const { logout } = authSlice.actions;
export default authSlice.reducer;
