import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/supabase";


export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase.from("blog_posts").select("*");
        if (error) throw error;
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchPostById = createAsyncThunk(
    'posts/fetchPostById',
    async (id) => {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    }
);
export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (id, { dispatch }) => {
        await supabase.from('blog_posts').delete().eq('id', id);
        dispatch(fetchPostById());
    }
);


//  Post slice
const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        post: {},

        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchPostById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.post = action.payload;
            })
            .addCase(fetchPostById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default postSlice.reducer;
