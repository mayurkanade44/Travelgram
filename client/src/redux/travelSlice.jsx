import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { authFetch } from "../utils";

const initialState = {
  loading: false,
  blog: {},
  blogs: [],
};

export const createBlog = createAsyncThunk(
  "travel/create",
  async (blog, thunkAPI) => {
    try {
      const res = await authFetch.post("/travel", blog);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getAllBlogs = createAsyncThunk(
  "travel/blogs",
  async (_, thunkAPI) => {
    try {
      const res = await authFetch.get("/travel");
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const singleBlog = createAsyncThunk(
  "travel/blog",
  async (id, thunkAPI) => {
    try {
      const res = await authFetch.get(`/blog/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const travelSlice = createSlice({
  name: "travel",
  initialState,
  extraReducers: {
    [createBlog.pending]: (state) => {
      state.loading = true;
    },
    [createBlog.fulfilled]: (state, { payload }) => {
      state.loading = false;
      toast.success(payload.msg);
    },
    [createBlog.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    [getAllBlogs.pending]: (state) => {
      state.loading = true;
    },
    [getAllBlogs.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.blogs = payload;
    },
    [getAllBlogs.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    [singleBlog.pending]: (state) => {
      state.loading = true;
    },
    [singleBlog.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.blog = payload;
    },
    [singleBlog.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
  },
});

export default travelSlice.reducer;
