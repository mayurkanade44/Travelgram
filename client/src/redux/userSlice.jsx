import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addLocalStorage, authFetch, getUserFromLocalStorage } from "../utils";
import { toast } from "react-toastify";

const initialState = {
  user: getUserFromLocalStorage(),
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

export const register = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const res = await authFetch.post("/user/register", user);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      const { user, token } = payload;
      state.loading = false;
      state.user = user;
      addLocalStorage(user, token);
      toast.success(`Hello Wanderer ${user.name}`);
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, { payload }) => {
      const { user, token } = payload;
      state.loading = false;
      state.user = user;
      addLocalStorage(user, token);
      toast.success(`Welcome Wanderer ${user.name}`);
    },
    [register.rejected]: (state, {payload}) => {
      state.loading = false;
      toast.error(payload)
    }
  },
});

export default userSlice.reducer;
