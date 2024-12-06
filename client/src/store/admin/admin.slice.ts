import { AccountUsers } from "@/components/Account/column";
import ApiClient from "@/lib/apiClient";
import { NewAdminSchemaType } from "@/schema/auth.schema";
import { AuthorPasswordType } from "@/schema/setting.scehma";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IntitalState {
  isLoading: boolean;
  data: AccountUsers[];
  error: unknown;
}

const initialState: IntitalState = {
  isLoading: false,
  data: [],
  error: null,
};

export const registerAdmin = createAsyncThunk(
  "/auth/register",
  async (data: NewAdminSchemaType, { rejectWithValue }) => {
    try {
      const res = await ApiClient.post("auth/register", data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const allAdmins = createAsyncThunk(
  "/auth/authors",
  async (_, { rejectWithValue }) => {
    try {
      const res = await ApiClient.get("auth/authors");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAdmin = createAsyncThunk(
  "/auth/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await ApiClient.delete("auth/delete/" + id);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeAdminPassword = createAsyncThunk(
  "/auth/update-password",
  async (data: AuthorPasswordType, { rejectWithValue }) => {
    try {
      const res = await ApiClient.put("auth/update-password", data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAdmin: (state) => {
      state.isLoading = false;
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
        state.error = null;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(allAdmins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allAdmins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(allAdmins.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(deleteAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((item) => item.id !== action.payload.id);
      })
      .addCase(deleteAdmin.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(changeAdminPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeAdminPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changeAdminPassword.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetAdmin } = adminSlice.actions;

export default adminSlice.reducer;
