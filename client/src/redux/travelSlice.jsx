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
  },
});

export default travelSlice.reducer;
