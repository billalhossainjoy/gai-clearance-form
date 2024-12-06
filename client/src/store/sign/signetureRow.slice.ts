import ApiClient from "@/lib/apiClient";
import {
  createSignetureRowSchemaType,
  updateSignetureRowSchemaType,
} from "@/schema/clearance.schema";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SignetureState {
  isLoading: boolean;
  data: createSignetureRowSchemaType[];
}

const initialState: SignetureState = {
  isLoading: false,
  data: [],
};

export const createSignetureRow = createAsyncThunk(
  "/clearance/add-row",
  async (data: createSignetureRowSchemaType, { rejectWithValue }) => {
    try {
      const res = await ApiClient.post("/clearance/add-row", data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllSignetureRows = createAsyncThunk(
  "/clearance/rows",
  async (_, { rejectWithValue }) => {
    try {
      const res = await ApiClient.get("/clearance/rows");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSignetureRow = createAsyncThunk(
  "/clearance/update/:id",
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: updateSignetureRowSchemaType;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await ApiClient.put("/clearance/update/" + id, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteSignetureRow = createAsyncThunk(
  "/clearance/delete/:id",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await ApiClient.delete("/clearance/delete/" + id);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const signetureRowSlice = createSlice({
  name: "signeture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSignetureRow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSignetureRow.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = [...state.data, action.payload];
      })
      .addCase(createSignetureRow.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchAllSignetureRows.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSignetureRows.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllSignetureRows.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(updateSignetureRow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSignetureRow.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((row) =>
          row.id === action.payload.id ? action.payload : row
        );
      })
      .addCase(updateSignetureRow.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(deleteSignetureRow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSignetureRow.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((row) => row.id !== action.payload.id);
      })
      .addCase(deleteSignetureRow.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default signetureRowSlice.reducer;
