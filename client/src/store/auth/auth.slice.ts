import { AccountUsers } from "@/components/Account/column";
import ApiClient from "@/lib/apiClient";
import { LoginSchemaType } from "@/schema/auth.schema";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IntitalState {
  isLoading: boolean;
  authData: AccountUsers | null;
  isAuthenticated: boolean;
  error: unknown;
}

const initialState: IntitalState = {
  isLoading: false,
  authData: null,
  error: null,
  isAuthenticated: false,
};

export const loginAdmin = createAsyncThunk(
  "/auth/login",
  async (data: LoginSchemaType, { rejectWithValue }) => {
    try {
      const res = await ApiClient.post("auth/login", data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutAdmin = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await ApiClient.get("auth/logout");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCurrentAdmin = createAsyncThunk(
  "/auth/user",
  async (_, { rejectWithValue }) => {
    try {
      const res = await ApiClient.get("auth/user");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.isLoading = false;
      state.authData = null;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAdmin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginAdmin.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(logoutAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutAdmin.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(getCurrentAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.authData = action.payload;
      })
      .addCase(getCurrentAdmin.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.authData = null;
      });
  },
});

export const { resetAuth } = authSlice.actions;

export default authSlice.reducer;
