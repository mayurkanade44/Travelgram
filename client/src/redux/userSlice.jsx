import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authFetch } from "../utils";
import { toast } from "react-toastify";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
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

export const googleLogin = createAsyncThunk(
  "user/googleLogin",
  async (user, thunkAPI) => {
    try {
      const res = await authFetch.post("/user/googleLogin", user);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.loading = false;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
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
      const { user } = payload;
      state.loading = false;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(`Welcome New Wanderer ${user.name}`);
    },
    [register.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    [googleLogin.pending]: (state) => {
      state.loading = true;
    },
    [googleLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      localStorage.setItem("user", JSON.stringify(payload.user));
      toast.success(`Welcome Wanderer ${payload.user.name}`);
    },
    [googleLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
