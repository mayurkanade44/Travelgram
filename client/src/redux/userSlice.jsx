import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addLocalStorage, authFetch } from "../utils";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  loading: false,
};

export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
  try {
    const res = await authFetch.post("/user/login", user);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.loading = false;
      state.user = user;
      addLocalStorage(user);
      toast.success(`Hello Wanderer ${user.name}`);
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
  },
});

export default userSlice.reducer;
